import React, {useContext, useEffect, useState } from "react";
// import {io}from "socket.io-client";
import {useNavigate } from "react-router-dom";

import "../../style/Chat.css";
import SocketContext from "../../socket/socket";



function Chat() {
  const socket = useContext(SocketContext)
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  let [search,setSearch] = useState("");


  useEffect(()=>{
    if(userID){
        console.log("socket === ",socket);

        socket.on("searched_value",(doc)=>{
          const searchedData = doc
          console.log("searched Data === ",searchedData);
          
        })
      }else{
        navigate("/login");
      }
  })
  function userSearch(search){
    socket.emit("get_users",{
      search:search})
  }
  return (
    <>
      <div className="chat">
        <div className="app">
          <div className="app1">
            <header>
              <div className="div">
                <i className="fa fa-users icon" aria-hidden="true"></i>
                <p className="icon">Chats</p>
                <p className="icon">Updates</p>
                <p className="icon">Calls</p>
              </div>
            </header>
            <div className="div1">
              <input type="text" list="usersname" name="userSearchInput" id="userSearchInput" placeholder="search" onChange={(e)=>{
                e.preventDefault();
                setSearch(e.target.value);
                console.log("in search user ===",search);
                userSearch(search);
              }}
              />
              <button>search</button>
              <datalist id="usersname"></datalist>
            </div>
            <hr />
            <div id="userlist"></div>
          </div>
          <div className="app2">
            <div className="div3">
              <div className="div3a">
                <i className="fa fa-user-circle" aria-hidden="true"></i>
                <p className="p2" id="chatScreenUserName"></p>
              </div>
            </div>
              <div className="div4">
          <div id="chatDiv" className="chatDiv">
          </div>
          <div className="div5">
            <div id="chtInputDiv">
              <input
                type="text"
                name="dropMessageInput"
                id="dropMessageInput"
              />
              <button>send</button>
            </div>
          </div>
        </div>
            


          </div>
        </div>
        {/* <div className="div4">
          <div id="chatDiv" className="chatDiv"></div>
          <div className="div5">
            <div id="chtInputDiv">
              <input
                type="text"
                name="dropMessageInput"
                id="dropMessageInput"
              />
              <button onclick="dropMessage()">send</button>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Chat;
