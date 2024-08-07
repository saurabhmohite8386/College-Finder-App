const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema({
    Message : {
        type:String,
        required:true
    },
    Email : {
        type:String,
        required:true
    },
    Name : {
        type:String,
        required:true
    }
})

const Message=new mongoose.model("Message",messageSchema);

module.exports=Message;