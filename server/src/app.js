import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "../routers/userRouter.js";


const serverEinstence = express();

dotenv.config();


// corse connection
serverEinstence.use(cors({
    allowedHeaders:"*",
    methods:"*",
    origin:"*",
    exposedHeaders:"*",
    preflightContinue:true
}))

serverEinstence.use(express.json());

// routers
serverEinstence.use(userRouter)


// create server
const port = process.env.SERVER_PORT

serverEinstence.listen(port,()=>{
    console.log(`server is active on port ${port}...`);
})