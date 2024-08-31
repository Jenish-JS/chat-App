// import userLoginModel from "../models/userLoginModel.js";
import { verifyJWT } from "../services/jwToken.js";
import { algJsonForJWTConfigVar } from "../../configurations/baseConfig.js";
import userModel from "../models/userModel.js";

const userDetailsCont = async (req, res) => {
  try {

    const token = req.headers.cookie?.split("=")[1];

    if (!token) {
      res.status(401).send({
        status: 401,
        message: "User not logged in",
      });
      return;
    }

    const verifyJwToken = await verifyJWT(token, algJsonForJWTConfigVar.user);

    if (!verifyJwToken) {
      res.status(401).send({
        status: 401,
        message: "invalid token",
      });
      return;
    }
console.log(verifyJwToken)
    const user = await userModel.findOne({userID: verifyJwToken.data.id});

    if (!user) {
      res.status(404).send({
        status: 404,
        message: "user not found",
      });
      return
    }

    res.status(200).send({
      status: 200,
      meaasgge: "user details",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: error.message,
      error,
    });
  }
};

export default userDetailsCont;
