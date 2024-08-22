import { salt } from "../configurations/baseConfig";
import userModel from "../models/userModel";
import { createHashKey } from "../services/hashing";

const userCreateCont = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const profile = req.body.profile_pic;

    const hashPassword = await createHashKey(password, salt);

    const dataModel = new userModel({
      name: name,
      email: email,
      password: hashPassword,
      profile_pic: profile,
    });

    const savedData = await dataModel.save();
    res.status(200).send(savedData);
  } catch (error) {
    res.send({
      message: "error in database",
      error,
    });
  }
};

export default userCreateCont
