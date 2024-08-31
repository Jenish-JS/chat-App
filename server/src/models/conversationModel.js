import mongoose from "mongoose";
import { v4 } from "uuid";

const conversationModelSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref:"users"
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref:"users"
  },
  message:{
    type:mongoose.Schema.ObjectId
  }
},{
    timeseries:true
});

const conversationModel = mongoose.model("Conversation",conversationModelSchema)

export default conversationModel
