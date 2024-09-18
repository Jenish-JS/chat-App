import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cookieparser from "cookie-parser";
import { v1 } from "uuid";

import userRouter from "./routers/userRouter.js";
import userModel from "./models/userModel.js";
import messageModel from "./models/messageModel.js";


const serverEinstence = express();

dotenv.config();
serverEinstence.use(cookieparser());

// corse connection
serverEinstence.use(
  cors({
    allowedHeaders: "*",
    methods: "*",
    origin: "*",
    exposedHeaders: "*",
    preflightContinue: true,
  })
);

serverEinstence.use(express.json());

// routers
serverEinstence.use(userRouter);

// create server
const port = process.env.SERVER_PORT;

const server = serverEinstence.listen(port, () => {
  console.log(`server is active on port ${port}...`);
});

// socket connection
const io = new Server(server, {
  cookie: true,
  cors: {
    origin: "*",
  },
});

io.on("connection", async(socket) => {
  console.log("user connected and id is ===", socket.id);

  socket.on("disconnect", (socket) => {
    console.log("user disconnected === ", socket.id);
  });

const getAllUSer = await userModel.find();
  socket.emit("all_user_get",getAllUSer);

  socket.on("get_users", async (doc) => {
    try {
      console.log("user searched === ", doc.search);

      const data = await userModel.find({
        $or: [
          { name: { $regex: `^${doc.search}`, $options: "i" } },
          { email: { $regex: `^${doc.search}`, $options: "i" } },
        ],
      });
      console.log("get_user data ===", data);

      socket.emit("searched_value", data);
      // catch all chats from database

    } catch (error) {}
  });

  socket.on("drop_message", async (doc) => {
    
      console.log("message === >  ", doc);

      const chatData = await messageModel.find({
        $or: [
          { senderID: doc.senderID, receiverID: doc.receiverID },
          { senderID: doc.receiverID, receiverID: doc.senderID },
        ],
      });

      console.log("chat data ====>>>>>",chatData);
      let chatMessage
      if(!chatData.length){
        const dataModel = new messageModel({
            chatID:v1,
            senderID: doc.senderID,
            receiverID: doc.receiverID,
            message: doc.message,
          });
    
          const savedData = await dataModel.save();
          chatMessage = savedData;
      }else{
        const dataModel = new messageModel({
            chatID:chatData[0].chatID,
            senderID: doc.senderID,
            receiverID: doc.receiverID,
            message: doc.message,
          });
    
          const savedData = await dataModel.save();
          chatMessage = savedData;
      }
      console.log("chat message ====>",chatMessage);

      socket.emit("send_message",chatMessage);

      socket.to(socket.id).emit("caught_message",chatMessage)
  });

  socket.on("catch_all_message",async(doc)=>{
    console.log("in catch all message from client ======>",doc);

    const chatData = await messageModel.find({
      $or: [
        { senderID: doc.senderID, receiverID: doc.receiverID },
        { senderID: doc.receiverID, receiverID: doc.senderID },
      ],
    });
    // console.log("get messages from database =====>",chatData);
    socket.emit("get_all_chat",chatData);
  })
});
