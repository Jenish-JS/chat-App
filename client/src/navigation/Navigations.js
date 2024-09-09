import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "../components/auth/Login.js";
import Chat from "../components/userChat/Chat.js";
import Outlets from "../outlet/Outlets.js";
import Signup from "../components/auth/Signup.js";
import Login from "../components/auth/Login.js";
// import Outlets from "../outlet/Outlets.js";

function Navigations() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<Outlets/>}>
        <Route path="/chat" element={<Chat />}></Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default Navigations;
