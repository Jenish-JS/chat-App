import mongoose from "mongoose";

const userLoginSchema = new mongoose.Schema({
    userID:{
        type:String,
        unique:true,
        required:true,
    },
    userAgent:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    ipAddress:{
        type:String,
        required:true
    }
})

const userLoginModel = mongoose.model("login",userLoginSchema);

export default userLoginModel;