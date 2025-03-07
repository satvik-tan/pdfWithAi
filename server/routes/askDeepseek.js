const { getTextMain } = require("./upload");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const text = await getTextMain();
    const userInput = req.body.message || ""; // Get user input from request body
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "qwen/qwq-32b:free",
        "messages": [
          {"role": "user", "content": `${userInput} based on the ${text}` }
        ],
        "top_p": 1,
        "temperature": 0.7,
        "repetition_penalty": 1
      })
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();
    
    // Output the model's response to console
    console.log(data.choices[0].message.content);
    
    const result = data.choices[0].message.content;
    
    // Send back with the expected structure for the frontend
    res.json({ reply: result });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;