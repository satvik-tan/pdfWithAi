import React, { useState } from "react";
import axios from "axios";

const UploadComponent = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // Preview the PDF
  };

  const handleUpload = async () => {
    if (!pdfFile) {
      setMessage("Please select a PDF to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Upload successful: " + response.data.filePath);
    } catch (error) {
      console.error("Upload failed", error);
      setMessage("Upload failed. Try again.");
    }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>

      {previewUrl && (
        <div>
          <h3>PDF Preview:</h3>
          <iframe src={previewUrl} width="100%" height="500px"></iframe>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;