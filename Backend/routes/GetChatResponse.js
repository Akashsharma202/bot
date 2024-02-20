require("dotenv").config();
const express = require('express');
const router = express.Router();
const  OpenAIApi  = require('openai');
const OPENAI_API_KEY=process.env.OPENAI_API_KEY;
const openai = new OpenAIApi({
    key: OPENAI_API_KEY,
  });

router.get("/",async(req,res)=>{
    try{
        const prompt = req.query.question;
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: prompt }],
            temperature: 1,
            max_tokens: 2000
        });
        res.status(200).json(response.choices[0]);
        console.log(response.choices[0].message.content);
    }catch(error){
         console.log(error);
    }
})
module.exports=router;