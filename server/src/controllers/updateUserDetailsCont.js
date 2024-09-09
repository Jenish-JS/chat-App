import { algJsonForJWTConfigVar } from "../configurations/baseConfig.js";
import userModel from "../models/userModel.js";
import { verifyJWT } from "../services/jwToken.js";

const updateUserDetailsCont = async (req, res) => {
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

    const user = await userModel.updateOne(
      { userID: verifyJwToken.data.id },
      {
        name: req.body.name,
        profile_pic: req.body.profile_pic,
      }
    );

    const userDetails = await userModel.findOne({
      userID: verifyJwToken.data.id,
    });

    res.status(200).send({
      status: 200,
      message: "user updated successfully",
      userDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 400,
      message:"error in update user details",
      error,
    });
  }
};

export default updateUserDetailsCont;
