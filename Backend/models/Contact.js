const mongoose=require("mongoose");

const contactSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    contactName:{
        type:String,
        required:true
    },
    relation:{
        type:String
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true
    }
});

module.exports=mongoose.model("contact",contactSchema);