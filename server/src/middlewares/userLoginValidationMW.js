import userLoginModel from "../models/userLoginModel.js";
import userModel from "../models/userModel.js";
import { varifyHashedKey } from "../services/hashing.js";

const userLoginValidationMW = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!password || !email) {
      res.status(400).send({
        status: 400,
        message: "all filds are required",
      });
      return;
    }

    const user = await userModel.findOne({ email: email });

    if (!user) {
      res.status(404).send({
        status: 404,
        message: "user not exist",
      });

      return;
    }

    const passwordValidation = await varifyHashedKey(password,user.password);

    if (!passwordValidation) {
      res.status(401).send({
        status: 401,
        message: "incorect password",
      });
    }

    const getData = await userLoginModel.findOne({ userID: user.userID });

    if (getData) {
      res.status(409).send({
        status: 409,
        message: "user olredy login",
      });

      return;
    }

    next();
  } catch (error) {
    res.send(console.log("error in user login validation"));
  }
};

export default userLoginValidationMW;
