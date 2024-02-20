require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const GetMessage=require("./routes/GetMessage");
const PostMessage=require("./routes/PostMessage");
const GetChatResponse=require('./routes/GetChatResponse');
const EmptyPost=require("./routes/EmptyPost");
const app = express();
const uri = process.env.URI;
const PORT = process.env.PORT;
app.use(express.json());
// Allow requests only from a specific origin
app.use(cors({
  origin: 'http://chatbot-lg16.vercel.app'
}));

app.use(express.urlencoded({ extended: true }));

// configure OpenAI


// db connecting
mongoose.connect(uri, {
    useNewUrlParser: true, // Use the new URL parser (avoid deprecation warning)
    useUnifiedTopology: true, 
})
    .then(() => {
        console.log(process.env.NODE_ENV);
        console.log("Db is connected");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });

app.use("/GetMessage", GetMessage);
app.use("/PostMessage", PostMessage);
app.use("/GetChatResponse",GetChatResponse);
app.use("/EmptyPost",EmptyPost);

app.get("/", (req, res) => {
    res.send("hello");
})

app.listen(PORT, () => console.log("Server has been started"));
