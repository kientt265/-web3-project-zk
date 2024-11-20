
import { ethers, JsonRpcProvider, Signer} from "ethers";
import React, { useEffect, useState } from 'react';

interface ChildComponentProps{
    signer: Signer;
    proof: string;
    res: string;
    provider: JsonRpcProvider;
}
const SignHistory: React.FC<ChildComponentProps> = ({ signer, proof, res, provider }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const contractAdr = import.meta.env.VITE_CONTRACT_ADDRESS_HISTORY || "";
    const contractABI = JSON.parse(import.meta.env.VITE_CONTRACT_ABI_HISTORY || "[]");
    const contract = new ethers.Contract(contractAdr, contractABI, signer )
    useEffect(() => {
        const fetchAddress = async () => {
            if (signer) {
                const addressAcc = await signer.getAddress();
                console.log("Signer Address:", addressAcc);
                await contract.addHistory(addressAcc, proof, res)
                setLoading(true)
            }
        };
        fetchAddress();
    }, [signer]);
    
    
    
  return (
    <div>
      <div>loading: {loading}</div>
    </div>
  );
};

export default SignHistory;