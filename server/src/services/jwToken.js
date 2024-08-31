import jwt from "jsonwebtoken";

const createJWT = async (payload,alg)=>{
    try {
        const secreatKey = process.env.JWT_KEY

        const jsonToken = await jwt.sign(
            {...payload},
            secreatKey,
            {
                algorithm:alg,
                expiresIn:"10h"
            }
        );

        return{status:"success",token:jsonToken};
    } catch (error) {
        console.log("error in json web token ");

        return{status:failed,error}
    }
}

const verifyJWT = async (token,alg)=>{
    try {
        const secreatKey = process.env.JWT_KEY

        const tokenVerification = await jwt.verify(token,secreatKey,{
            algorithms:alg
        })

        return{isValid:true,data:tokenVerification}
    } catch (error) {
        return{isValid:false,error}
    }
}

export {createJWT,verifyJWT}