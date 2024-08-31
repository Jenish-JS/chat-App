import { algJsonForJWTConfigVar } from "../../configurations/baseConfig.js";
import userLoginModel from "../models/userLoginModel.js";
import userModel from "../models/userModel.js";
import { createJWT } from "../services/jwToken.js";

const userLoginCont = async (req, res) => {
  try {
    const getData = await userModel.findOne({ email: req.body.email });

    if (!getData) {
      res.status(401).send({
        status: 400,
        message: "user doesn't exist",
      });
      return;
    }

    const jwToken = await createJWT(
      { id: getData.userID, email: getData.email },
      algJsonForJWTConfigVar.user
    );

    if (!(jwToken.status === "success")) {
      res.status(400).send({
        status: 400,
        message: "jwt error",
        error: jwToken.error,
      });
      return;
    }

    const userAgent = req.headers["user-agent"];
    const clientIpAddress =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const data = new userLoginModel({
      userID: getData.userID,
      userAgent: userAgent,
      token: jwToken.token,
      ipAddress: clientIpAddress,
    });

    const saveData = await data.save();

    // res.cookie("loginToken", jwToken.token);
   

    res.cookie("loginToken",jwToken.token).status(200).send({
      status: 200,
      message: "user login successfully",
      token: jwToken.token,
      data: saveData,
    });
  } catch (error) {
    console.log("error === ", error.stack);

    res.status(400).send(error);
  }
};

export default userLoginCont;
