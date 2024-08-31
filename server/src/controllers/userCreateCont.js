import { salt } from "../../configurations/baseConfig.js";
import userModel from "../models/userModel.js";
import { createHashKey } from "../services/hashing.js";

const userCreateCont = async (req, res) => {
  try {
    const data = req.body;


    // Check if user already exists
    const checkEmail = await userModel.findOne({ email: data.email });

    if (checkEmail) {
      return res.status(400).send({
        status: 400,
        message: "User already exists.",
      });
    }


    // hash password
    const hashPassword = await createHashKey(data.password, salt);

    // create user
    const dataModel = new userModel({
      name: data.name,
      email: data.email,
      password: hashPassword,
      profile_pic: data.profile_pic,
    });

    const savedData = await dataModel.save();
    
    res.status(201).send(savedData);
  } catch (error) {
    console.log("database error",error)
    res.status(500).send({
      message: "error in database.......",
      error
    });
  }
};

export default userCreateCont
