const mongoose=require("mongoose");

const alertSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
  latitude:{
    type:Number,
    required:true
  },
  longitude:{
      type:Number,
    required:true
  },
  locationAddress:{
    type:String
  },
  trackingId:{
    type: String,
    unique: true
  },
  message: {
    type: String,
    default: "Emergency! I need help."
  },

  status: {
    type: String,
    enum: ["active", "resolved"],
    default: "active"
  },

  triggeredAt: {
    type: Date,
    default: Date.now
  }
});

module.exports=mongoose.model("Alert",alertSchema);