const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  console.log("User message:", message);

  // Simulate AI response
  res.json({ reply: `AI: You said "${message}"` });
});

module.exports = router;
