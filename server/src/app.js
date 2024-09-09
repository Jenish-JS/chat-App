import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {Server}from "socket.io";
import cookieparser from "cookie-parser";

import userRouter from "./routers/userRouter.js";
import userModel from "./models/userModel.js";


const serverEinstence = express();

dotenv.config();
serverEinstence.use(cookieparser());

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

const server = serverEinstence.listen(port,()=>{
    console.log(`server is active on port ${port}...`);
})



// socket connection
const io = new Server(server,{
    cookie:true,
    cors:{
        origin:"*"
    }
});


io.on("connection",(socket)=>{
    console.log("user connected and id is ===",socket.id);

    socket.on("disconnect",(socket)=>{
        console.log("user disconnected === ",socket.id);
    })

    socket.on("get_users",async(doc)=>{
        try {
            const {search} = doc;
            console.log("user searched === ",search);
            const str = `/^${search}/`;

            const data = await userModel.find({
                $or:[
                    {name:{$regex:`^${search}`,$options:"i"}},
                    {email:{$regex:`^${search}`,$options:"i"}}
                ]
            })
            console.log("get_user data ===",data);

            socket.emit("searched_value",data);
        } catch (error) {
            
        }
    })
});