import React, { useState, useEffect } from 'react';
import * as snarkjs from 'snarkjs';
import input from '../assets/prove/input.json';

// Định nghĩa kiểu dữ liệu cho proof và error
interface Proof {
  proof: any;
  publicSignals: any;
}

const ProofComponent: React.FC = () => {
  const [proof, setProof] = useState<Proof | null>(null); // proof có thể là null hoặc có kiểu Proof
  const [error, setError] = useState<string | null>(null); // error có thể là null hoặc có kiểu string

  const generateProof = async () => {
    try {
      // Fetch the proving key
      const provingKeyResponse = await fetch('/assets/prove/ageCircuit_0001.zkey');
      if (!provingKeyResponse.ok) throw new Error('Failed to fetch proving key');
      const provingKey = await provingKeyResponse.arrayBuffer();
      console.log("Proving Key:", provingKey);

      // Fetch the WASM file
      const witnessResponse = await fetch('/assets/prove/ageCircuit.wasm');
      if (!witnessResponse.ok) throw new Error('Failed to fetch WASM file');
      const wasm = await witnessResponse.arrayBuffer();
      console.log("WASM:", wasm);
      console.log("Input data:", input);
      // Generate proof
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, wasm, provingKey);
      console.log('Proof:', proof);
      console.log('Public Signals:', publicSignals);

      // Update state
      setProof({ proof, publicSignals });
    } catch (err) {
      console.error('Error generating proof:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  useEffect(() => {
    generateProof();
  }, []);

  return (
    <div>
      <h1>Generate zk-SNARK Proof</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {proof ? (
        <pre>{JSON.stringify(proof, null, 2)}</pre>
      ) : (
        <p>Generating proof...</p>
      )}
    </div>
  );
};

export default ProofComponent;
