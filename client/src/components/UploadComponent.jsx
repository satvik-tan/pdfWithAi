import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes"; // Import theme hook

const UploadComponent = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState("");
  const { theme } = useTheme(); // Get current theme
  
  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      // Revoke previous URL if it exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));
      setMessage("");
    } else {
      setPdfFile(null);
      setPreviewUrl(null);
      setMessage("Please upload a valid PDF file.");
    }
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
    <Card className="p-4 max-w-lg mx-auto mt-10 shadow-lg rounded-lg dark:bg-gray-800 dark:text-gray-100">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-bold">Upload PDF</CardTitle>
      </CardHeader>
      
      <div className="mb-4">
        <Input 
          type="file" 
          accept="application/pdf" 
          onChange={handleFileChange}
          className="dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      
      <Button 
        className="w-full" 
        onClick={handleUpload}
      >
        Upload
      </Button>
      
      <p className={`mt-2 text-sm ${message.includes("failed") ? "text-red-500 dark:text-red-400" : "text-gray-600 dark:text-gray-300"}`}>
        {message}
      </p>
      
      {previewUrl && (
        <CardContent className="mt-6 p-0">
          <h3 className="text-lg font-medium mb-2">PDF Preview:</h3>
          <div className="w-full relative border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
            <iframe 
              src={previewUrl} 
              className="w-full h-96 bg-white" 
              title="PDF Preview"
              style={{ display: 'block' }}
            ></iframe>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default UploadComponent;