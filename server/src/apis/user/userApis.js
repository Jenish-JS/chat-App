import express from "express";

import userCreateCont from "../../controllers/userCreateCont.js";
import userValidationMW from "../../middlewares/userValidationMW.js";
import userDetailsCont from "../../controllers/userDetailsCont.js";
import updateUserDetailsCont from "../../controllers/updateUserDetailsCont.js";
import userValidCont from "../../controllers/userValidCont.js";

const userApis = express.Router()

// create user 
userApis.post("/create",userValidationMW,userCreateCont)

// get user all details
userApis.get("/details",userDetailsCont)

// update user details
userApis.post("/update",updateUserDetailsCont)

//  get user
userApis.get("/get/:email",userValidCont)

export default userApis;