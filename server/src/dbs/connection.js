import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const port = process.env.DB_PORT
const user = process.env.DB_USER
const password = process.env.DB_PASS
const domain = process.env.DB_DOMAIN
const name = process.env.DB_NAME

mongoose.connect(`${port}://${user}:${password}@${domain}/${name}`,{

}).then(()=>{
    
    console.log("database connected successfully!");
}).catch((err)=>{
    console.log("database connection faild!!",err);
})