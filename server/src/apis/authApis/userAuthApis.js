import express from "express";
import userLoginCont from "../../controllers/userLoginCont.js";
import userLoginValidationMW from "../../middlewares/userLoginValidationMW.js";
import userLogOutCont from "../../controllers/userLogoutCont.js";

const userAuthApis = express.Router()

// user login
userAuthApis.post("/login",userLoginValidationMW,userLoginCont)

// user logout
userAuthApis.get("/logout",userLogOutCont)


export default userAuthApis