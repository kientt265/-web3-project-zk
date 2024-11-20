import React, { useState } from "react";
import { Contract, Signer } from "ethers";
import SnarkjsProof from "./SnarkjsProof";

interface GetInputPatientProp{
  signer: Signer;
}
const GetInputPatient: React.FC<GetInputPatientProp> = ({signer}) => {
  const [age, setAge] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [accountAddress, setAddressWallet] = useState<string | null>(null);
  const contractAdr = import.meta.env.VITE_CONTRACT_ADDRESS_PROFILEPATIENT || "";
  const contractABI = JSON.parse(import.meta.env.VITE_CONTRACT_ABI_PROFILEPATIENT || "[]");

  const fetchAddress = async () => {
    if (signer) {
        const addressAcc = await signer.getAddress();
        console.log("Signer Address:", addressAcc);
        setAddressWallet(addressAcc)
       
    }
  };
  fetchAddress();
  const getPatientAge = async () => {
    try {
      setLoading(true);

      const contract = new Contract(contractAdr, contractABI, signer);
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
      <SnarkjsProof signer={signer} age = {age} />
    </div>
  );
};

export default GetInputPatient;
