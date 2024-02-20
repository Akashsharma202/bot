const mongoose=require('mongoose');
const dataSchema=new mongoose.Schema({
    username: String,
    messages:Array
});
const userData=mongoose.model("userInfo",dataSchema);
module.exports=userData;