// client/src/components/InteractIPFS.tsx
import React, { useState } from 'react';
import axios from 'axios';

const InteractIPFS: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [cid, setCid] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:7000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setCid(response.data.cid);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFetch = async () => {
    if (!file) return;

    try {
      const response = await axios.get(`http://localhost:7000/fetch/${file.name}`);
      setFileContent(response.data);
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };

  return (
    <div>
      <h1>Interact with IPFS</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleFetch}>Fetch</button>

      {cid && <p><strong>Uploaded CID:</strong> {cid}</p>}

      {fileContent && (
        <div>
          <h3>File Content:</h3>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default InteractIPFS;
