import React, { useState } from "react";
import { JsonRpcProvider, Wallet, Contract } from "ethers";
import SnarkjsProof from "./SnarkjsProof";

const GetInputPatient: React.FC = () => {
  const [age, setAge] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const contractAdr = import.meta.env.VITE_CONTRACT_ADDRESS_PROFILEPATIENT || "";
  const contractABI = JSON.parse(import.meta.env.VITE_CONTRACT_ABI_PROFILEPATIENT || "[]");
  const rpcUrl = import.meta.env.VITE_SEPOLIA_RPC_URL || "";
  const privateKey = import.meta.env.VITE_WALLET_PRIVATE_KEY || "";

  const provider = new JsonRpcProvider(rpcUrl); // ethers@6.x
  const wallet = new Wallet(privateKey, provider);
  const accountAddress = wallet.address;

  const getPatientAge = async () => {
    try {
      setLoading(true);

      const contract = new Contract(contractAdr, contractABI, wallet);
      const tokenId = await contract.balanceOf(accountAddress);
      const tokenURI = await contract.tokenURI(tokenId);
      const response = await fetch(tokenURI);
      const metadata = await response.json();

      const ageAttribute = metadata.attributes.find(
        (attr: { trait_type: string }) => attr.trait_type === "Age"
      );

      if (!ageAttribute) {
        throw new Error("Age attribute not found in metadata.");
      }

      setAge(ageAttribute.value);
      // onAgeChange(ageAttribute.value);
    } catch (error) {
      console.error("Error fetching age:", error);
      setAge(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Get Patient Age</h2>
      <button onClick={getPatientAge} className="bg-blue-500">Fetch Age</button>
      {loading && <p>Loading...</p>}
      {age && <p><strong>Age:</strong> {age}</p>}
      <SnarkjsProof signer={wallet} age = {age} />
    </div>
  );
};

export default GetInputPatient;
