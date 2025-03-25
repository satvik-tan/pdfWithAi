import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { preprocessLaTeX } from "./preprocess";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes"; // Import theme hook

export default function AIAssistantCard() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme(); // Get current theme

  const askDeepSeek = async () => {
    if (!message.trim()) return;
    setIsLoading(true);
    const userMessage = message;
    
    try {
      const res = await axios.post("http://localhost:5000/askDeepseek", {
        message: message,
      });
      
      const processedResponse = preprocessLaTeX(res.data.reply);
      
      setConversation((prev) => [
        ...prev,
        { role: "user", content: userMessage },
        { role: "ai", content: processedResponse },
      ]);
      
      setMessage("");
    } catch (error) {
      console.error("Deepseek request failed", error);
      
      setConversation((prev) => [
        ...prev,
        { role: "user", content: userMessage },
        { role: "ai", content: "Error: Failed to get response from DeepSeek" },
      ]);
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
    <Card className="w-full max-w-md dark:bg-gray-800 dark:text-gray-100 transition-colors">
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
        <CardDescription className="dark:text-gray-300">Ask me anything about your data</CardDescription>
      </CardHeader>
      
      <CardContent className="h-64 overflow-y-auto border-y border-gray-100 dark:border-gray-700 p-4">
        {conversation.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 italic">
            No messages yet. Start a conversation!
          </p>
        ) : (
          conversation.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 p-2 rounded-lg ${
                msg.role === "ai" 
                  ? "bg-gray-50 dark:bg-gray-700 text-left" 
                  : "bg-blue-50 dark:bg-blue-900 text-right ml-auto"
              } max-w-[85%] ${msg.role === "user" ? "ml-auto" : ""}`}
            >
              <div className="font-medium mb-1">
                {msg.role === "ai" ? "AI" : "You"}
              </div>
              <div className={`text-sm ${msg.role === "ai" ? "dark:text-gray-200" : "dark:text-gray-100"}`}>
              <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {msg.content}
                  </ReactMarkdown>
              </div>
            </div>
          ))
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2 p-4">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={handleKeyDown}
          className="flex-grow dark:bg-gray-700 dark:border-gray-600"
        />
        <Button
          onClick={askDeepSeek}
          disabled={isLoading}
          className="whitespace-nowrap"
        >
          {isLoading ? 'Processing...' : 'Ask DeepSeek'}
        </Button>
      </CardFooter>
    </Card>
  );
}