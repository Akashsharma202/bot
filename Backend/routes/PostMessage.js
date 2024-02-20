const express = require('express');
const router = express.Router();
const userData = require("../models/userData");

router.put("/", async (req, res) => {
    try {
        const username = req.body.username;
        const messages = req.body.messages;
        const curr = await userData.findOne({ username:username }).maxTimeMS(15000);
        curr.messages=curr.messages.concat(messages);
        console.log(curr);
        const result=await curr.save();
        res.status(200).json({result:"Uploaded successfully"})
    } catch (error) {
        res.status(400).json({ error: error });
    }
})
module.exports = router;