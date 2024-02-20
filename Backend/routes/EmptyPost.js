const express=require('express');
const router=express.Router();
const UserData=require("../models/userData");
router.post("/",async(req,res)=>{
    try{
        const username=req.body.username;
        const messages=[];
        const result=new UserData({username:username,messages:messages});
        await result.save();
        res.status(200).send(result);
    }catch(error){
        console.log(error);
        res.status(400).send({error});
    }
})

module.exports=router;