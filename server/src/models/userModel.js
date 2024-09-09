import mongoose from "mongoose";
import { v1 } from "uuid";

const userModelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "provide name"]
    },
    userID:{
        type:String,
        default: v1
    },
    email:{
        type:String,
        unique:true,
        required:[true, "provide email"],
    },
    password:{
        type:String,
        required:[true,"provide password"]
    },
},{
    timestamps:true
})

const userModel = mongoose.model("users",userModelSchema)

export default userModel