import React, { useState } from "react";
import * as snarkjs from "snarkjs";
import { ethers } from "ethers";
// Define types for proof and public signals
interface Proof {
  pi_a: [string, string];
  pi_b: [[string, string], [string, string]];
  pi_c: [string, string];
}

type PublicSignal = string[];

interface SnarkjsProofProps {
  signer: ethers.Signer;
}

function SnarkjsProof({ signer }: SnarkjsProofProps) {
  const [proof, setProof] = useState<Proof | null>(null);
  const [publicSignals, setPublicSignals] = useState<PublicSignal | null>(null);
  const [result, setResult] = useState<string>("");
  const [generateCall, setGenerateCall] = useState<string>("");
  const [verificationResult, setVerificationResult] = useState<string>("");

  const calculateProof = async () => {
    setResult("Generating proof...");

    try {
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        { age: 25 },
        "./prove/ageCircuit.wasm",
        "./prove/ageCircuit_0001.zkey"
      );

      // Set proof and public signals to state
      setProof(proof);
      setPublicSignals(publicSignals);

      // Fetch the verification key
      const vkeyResponse = await fetch("./prove/verification_key.json");
      if (!vkeyResponse.ok) throw new Error("Failed to fetch verification key.");
      const vkey = await vkeyResponse.json();

      // Verify the proof
      const res = await snarkjs.groth16.verify(vkey, publicSignals, proof);
      setResult(res ? "Verification successful!" : "Verification failed.");

      // Generate the generate call
      generateCallFromProof(proof, publicSignals);
    } catch (error) {
      console.error("Error generating proof:", error);
      setResult("An error occurred. Please check the console for details.");
    }
  };

  const generateCallFromProof = (proof: Proof, publicSignals: PublicSignal) => {
    try {
      const pi_a = [
        "0x" + BigInt(proof.pi_a[0]).toString(16),
        "0x" + BigInt(proof.pi_a[1]).toString(16),
      ];

      const pi_b = [
                [
                    '0x' + BigInt(proof.pi_b[0][1]).toString(16), // Đổi vị trí
                    '0x' + BigInt(proof.pi_b[0][0]).toString(16)  // Đổi vị trí
                ],
                [
                    '0x' + BigInt(proof.pi_b[1][1]).toString(16), // Đổi vị trí
                    '0x' + BigInt(proof.pi_b[1][0]).toString(16)  // Đổi vị trí
                ]
            ];

      const pi_c = [
        "0x" + BigInt(proof.pi_c[0]).toString(16),
        "0x" + BigInt(proof.pi_c[1]).toString(16),
      ];

      // Convert public signals to the required format
      const finalPublicSignal = publicSignals.map((signal) =>
        "0x" + BigInt(signal).toString(16).padStart(64, "0")
      );

      // Prepare the generate call args
      const generateCallArgs = [pi_a, pi_b, pi_c, finalPublicSignal];

      // Set the generate call output
      setGenerateCall(JSON.stringify(generateCallArgs));
    } catch (error) {
      console.error("Error generating call:", error);
      setGenerateCall("An error occurred while generating the call.");
    }
  };

  const verifyProof = async () => {
    if (!generateCall) {
      setVerificationResult("No generate call available.");
      return;
    }

    try {
      const [pi_a, pi_b, pi_c, publicSignals] = JSON.parse(generateCall);
      const vkeyResponse = await fetch("./prove/verification_key.json");
      if (!vkeyResponse.ok) throw new Error("Failed to fetch verification key.");
      const vkey = await vkeyResponse.json();
      // Create a contract instance
      const contractAddress = "0xf9A1a97E853d46aCea4c751e2e5149b09eaA49C1"; // Replace with your contract address
      const contractABI = process.env.CONTRACT_ABI_PROOF_L2; // Ensure this is defined and not undefined
      if (!contractABI) throw new Error("Contract ABI is not defined.");
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Call the verifyProof function
      const res = await contract.verifyProof(pi_a, pi_b, pi_c, publicSignals);
      setVerificationResult(res ? "Verification successful!" : "Verification failed.");
    } catch (error) {
      console.error("Error verifying proof:", error);
      setVerificationResult("An error occurred during verification. Please check the console for details.");
    }
  };

  return (
    <div>
      <h1>Snarkjs Client Example</h1>
      <button onClick={calculateProof} className="bg-blue-400">Create proof</button>

      <pre>
        <strong>Proof:</strong>
        <code>{proof ? JSON.stringify(proof, null, 1) : "No proof generated"}</code>
      </pre>

      <pre>
        <strong>Public Signals:</strong>
        <code>
          {publicSignals ? JSON.stringify(publicSignals, null, 1) : "No public signals"}
        </code>
      </pre>

      <pre>
        <strong>Result:</strong>
        <code>{result}</code>
      </pre>

      <pre>
      <button
        onClick={() => {
            if (proof && publicSignals) {
            generateCallFromProof(proof, publicSignals);
            } else {
            setGenerateCall("Proof or public signals are not available.");
            }
        }}
        className="bg-green-400"
        >
        Generate Call
       </button>

        <code>{generateCall || "No generate call generated"}</code>
      </pre>

      <pre>
        <button onClick={verifyProof} className="bg-red-400">Verify Proof</button>
        <code>{verificationResult}</code>
      </pre>
    </div>
  );
}

export default SnarkjsProof;
