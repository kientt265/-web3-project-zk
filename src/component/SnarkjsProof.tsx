import React, { useState } from "react";
import * as snarkjs from "snarkjs";
import { ethers, JsonRpcProvider, Wallet, Signer } from "ethers";
import SignHistory from "./SignHistory"
// Define types for proof and public signals
interface Proof {
  pi_a: [string, string];
  pi_b: [[string, string], [string, string]];
  pi_c: [string, string];
}

type PublicSignal = string[];

interface SnarkjsProofProps {
  signer: Signer;
  age: string | null;
}

const SnarkjsProof:React.FC<SnarkjsProofProps> =  ({ signer, age }) => {
  const rpcUrl = import.meta.env.VITE_SEPOLIA_RPC_URL || "";
  const privateKey = import.meta.env.VITE_WALLET_PRIVATE_KEY || "";
        // Create a contract instance
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS_VERIFY_L1 || ""; // Replace with your contract address
  const contractABI = JSON.parse(import.meta.env.VITE_CONTRACT_ABI_VERIFY_L1 || "[]"); 
  // const provider = new JsonRpcProvider(rpcUrl); // ethers@6.x
  // const wallet = new Wallet(privateKey, provider);
  const [proof, setProof] = useState<Proof | null>(null);
  const [publicSignals, setPublicSignals] = useState<PublicSignal | null>(null);
  const [result, setResult] = useState<string>("");
  const [generateCall, setGenerateCall] = useState<string>("");
  const [verificationResult, setVerificationResult] = useState<string>("");

  const calculateProof = async () => {
    setResult("Generating proof...");

    try {
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        { age: age ? parseInt(age) : 0 },
        "./prove/ageCircuit.wasm",
        "./prove/ageCircuit_0001.zkey"
      );

      // Set proof and public signals to state
      setProof(proof);
      setPublicSignals(publicSignals);


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
      
// Ensure this is defined and not undefined
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

      {generateCall && verificationResult && (
        <div>
          <SignHistory signer={signer} proof={generateCall} res={verificationResult}  />
        </div>
      )}
    </div>
  );
}

export default SnarkjsProof;
