const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const uploadRoutes = require("./routes/upload").router;
const chatRoutes = require("./routes/chat");
const deepRoutes = require("./routes/askDeepseek");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/upload", uploadRoutes);
app.use("/chat", chatRoutes);
app.use("/askDeepseek", deepRoutes);

  
  // Run the function
 
  

app.listen(5000, () => console.log("Server running on port 5000"));


