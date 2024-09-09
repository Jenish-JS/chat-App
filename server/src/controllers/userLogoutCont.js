import { algJsonForJWTConfigVar } from "../configurations/baseConfig.js";
import userLoginModel from "../models/userLoginModel.js"
import { verifyJWT } from "../services/jwToken.js"


const userLogOutCont = async (req,res)=>{
    try {
        const token = req.headers.cookie?.split("=")[1];

        console.log(token)

        if(!token){
            res.status(401).send({
                status:401,
                message:"user not logged in"
            })
            return
        }

    const verifyJwToken = await verifyJWT(token,algJsonForJWTConfigVar.user)

    if(!verifyJwToken){
        res.status(401).send({
            status:401,
            message:"invalid token"
        })
        return
    }

    const removeData = await userLoginModel.deleteOne({userID:verifyJwToken.data.id})

    if(!removeData){
        res.status(404).send({
            status:404,
            message:"user not found"
        })
        return
    }

    res.status(200).send({
        status:200,
        message:"user log out",
        data:removeData
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status:500,
            message:error.message
        })
    }
}

export default userLogOutCont