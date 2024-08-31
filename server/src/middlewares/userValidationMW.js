import emailValidation from "../services/emailValidation.js";
import passwordValidation from "../services/passwordValidation.js";

function userValidationMW(req, res, next) {
  try {
    const emailVerificationJson = emailValidation(req.body.email);

    if (!emailVerificationJson.isValid) {
      res.status(400).send({
        status: 400,
        message: "user not created....",
        error: emailVerificationJson.reason,
      });
      return;
    }

    const passwordVerificationJson = passwordValidation(req.body.password);
    console.log(passwordVerificationJson.isValid);

    if (!passwordVerificationJson.isValid) {
      res.status(400).send({
        status: 400,
        message: "user not created..",
        error: passwordVerificationJson.reason,
      });
      return;
    }

    next();
  } catch (error) {
    res.send({
        ...error
    })
  }
}

export default userValidationMW;
