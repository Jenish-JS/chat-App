import express from "express";
import userCreateCont from "../../controllers/userCreateCont";
import userValidationMW from "../../middlewares/userValidationMW";

const userApis = express.Router()

userApis.post("/create",userValidationMW,userCreateCont)