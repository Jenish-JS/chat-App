import express from "express";
import userCreateCont from "../../controllers/userCreateCont.js";
import userValidationMW from "../../middlewares/userValidationMW.js";
import userDetailsCont from "../../controllers/userDetailsCont.js";

const userApis = express.Router()

// create user 
userApis.post("/create",userValidationMW,userCreateCont)

// get user all details
userApis.get("/details",userDetailsCont)

export default userApis;