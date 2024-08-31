import express from "express";
import userApis from "../apis/user/userApis.js";
import userAuthApis from "../apis/authApis/userAuthApis.js";

const userRouter = express.Router()

// user
userRouter.use("/user",userApis)

// user authentication
userRouter.use("/auth",userAuthApis)


export default userRouter