import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    default: "",
  },
  imageurl:{
    type:String,
    default:""
  },
  videourl:{
    type:String,
    default:""
  },
  seen:{
    type:Boolean,
    default:false
  }
},{
    timestamps:true
});

const messageModel = mongoose.model("message",messageSchema)

export default messageModel
