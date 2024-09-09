import userModel from "../models/userModel.js";


const userValidCont = async (req,res)=>{
    try {
        const userEmail = req.params.email;

        const fatchData = await userModel.findOne({email:userEmail});

        if(fatchData){
            res.status(200).json({
                userData:fatchData
            })
        }else{
            res.send("user not exist")
        }
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

export default userValidCont