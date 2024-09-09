import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatID:{
    type:String,
    required:true
  },
  status:{
    type:String,
    enum:["sent", "deliverd", "seen"],
    default: "sent"
  },
  senderID:{
    type:String,
    required:true
  },
  message:{
    type:String,
  },
  time:{
    type:Date,
    default:Date.now()
  }
});

const messageModel = mongoose.model("message",messageSchema)

export default messageModel
