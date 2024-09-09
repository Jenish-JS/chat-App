import { createContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);
export const socket = io("ws://localhost:7000");

export default SocketContext;