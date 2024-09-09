import mongoose from "mongoose";
import { v4 } from "uuid";

const chatSchema = new mongoose.Schema({
  chatID:{
    type:String,
    required:true,
    default:v4
  },
  chatType:{
    type:String,
    enum:[dairect,grup],
    default:dairect
  },
  partysepent:{
    type:[String]
  },
  time:{
    type:Date,
    default:Date.now()
  }
});

const chatModel = mongoose.model("chats",chatSchema)

export default chatModel
