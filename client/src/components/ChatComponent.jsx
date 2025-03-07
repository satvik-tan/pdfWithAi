import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles
import { preprocessLaTeX } from "./preprocess";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const askDeepSeek = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/askDeepseek", { 
        message: message // Send the user's message to the backend
      });
      const processedResponse = preprocessLaTeX(res.data.reply);
      setResponse(processedResponse);
      
      console.log("Response received:", res.data);
    } catch (error) {
      console.error("Deepseek request failed", error);
      setResponse("Error: Failed to get response from DeepSeek");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      askDeepSeek();
    }
  };

  return (
    <div className="right-column">
      <h2>Chat with DeepSeek AI</h2>
      <div style={{ marginBottom: '10px' }}>
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          onKeyDown={handleKeyDown}
          placeholder="Type your query..."
          style={{ width: '300px', padding: '8px', marginRight: '10px' }}
        />
        <button 
          onClick={askDeepSeek} 
          disabled={isLoading}
          style={{ padding: '8px 16px' }}
        >
          {isLoading ? 'Processing...' : 'Ask DeepSeek'}
        </button>
      </div>
      
      <div style={{ 
        border: response ? '1px solid #ddd' : 'none', 
        padding: response ? '15px' : '0',
        borderRadius: '5px',
        marginTop: '10px',
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        {response && <strong>AI Response:</strong>}
        <ReactMarkdown 
          children={response}
          remarkPlugins={[remarkMath]} 
          rehypePlugins={[rehypeKatex]} 
        />
      </div>
    </div>
  );
};

export default ChatComponent;
