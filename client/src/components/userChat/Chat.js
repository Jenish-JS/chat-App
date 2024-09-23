import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../style/Chat.css";
import SocketContext from "../../socket/socket";

function Chat() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  let [userSearchList, setUserSearchList] = useState([]);
  let [select, setSelect] = useState("");
  let [addUser, setAddUser] = useState([]);
  let [selectUSer, setSelectUser] = useState("");
  let [message, setMessage] = useState("");
  let [sendMessage, setSendMessage] = useState([]);
  let [getAllUSer, setGetAllUSer] = useState([]);

  useEffect(() => {
    if (userID) {
      const socketID = socket.id;

      socket.emit("registerUser", { userID, socketID });

      socket.on("all_user_get", (doc) => {
        console.log("get all user from server doc =====>", doc);
        setGetAllUSer([...doc]);
        console.log("get all user from server =====>", getAllUSer);
      });

      socket.on("searched_value", (doc) => {
        setUserSearchList(doc);
      });

      socket.on("send_message", (doc) => {
        console.log("send message",sendMessage);
        setSendMessage([...sendMessage, doc]);
      });

      socket.on("caught_message", (doc) => {
        setSendMessage([...sendMessage, doc]);
      });

      socket.on("get_all_chat", (doc) => {
        setSendMessage([...doc]);
      });
    } else {
      navigate("/login");
    }
  },[userID]);

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
              <input
                type="text"
                list="usersname"
                name="userSearchInput"
                id="userSearchInput"
                placeholder="search"
                onChange={(e) => {
                  e.preventDefault();

                  socket.emit("get_users", {
                    search: e.target.value,
                  });

                  userSearchList.filter((val) => {
                    if (val.name === e.target.value) {
                      localStorage.setItem("receiverID", val.userID);
                      setSelect(e.target.value);
                    }
                  });
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setAddUser([...addUser, select]);
                  setSelect("");
                }}
              >
                search
              </button>
              <datalist id="usersname">
                {userSearchList.map((val, idx) => {
                  return <option value={val.name} key={idx}></option>;
                })}
              </datalist>
            </div>
            <hr />
            <div id="userlist">
              {addUser.map((val, idx) => {
                return (
                  <div
                    className="userList"
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectUser(`${val}`);

                      const receiver = getAllUSer.filter(
                        (value) => value.name === val
                      );
                      const receiverID = receiver[0];
                      console.log("receiverID === ", getAllUSer);
                      localStorage.setItem("receiverID", receiverID.userID);
                      socket.emit("catch_all_message", {
                        senderID: localStorage.getItem("userID"),
                        receiverID: localStorage.getItem("receiverID"),
                      });
                    }}
                  >
                    {val.name}
                    {`${val}`}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="app2">
            <div className="div3">
              <div className="div3a">
                <i className="fa fa-user-circle" aria-hidden="true"></i>
                <p className="p2" id="chatScreenUserName">{`${selectUSer}`}</p>
              </div>
            </div>
            <div className="div4">
              <div id="chatDiv" className="chatDiv">
                {sendMessage.length > 0 &&
                  sendMessage.map((val, idx) => (
                    <div
                      key={idx}
                      className={`message ${
                        val.senderID === userID ? "right-message" : ""
                      }`}
                    >
                      <span className="chat-span-text">{val.message}</span>
                    </div>
                  ))}
              </div>
              <div className="div5">
                <div id="chtInputDiv">
                  <input
                    type="text"
                    name="dropMessageInput"
                    id="dropMessageInput"
                    onChange={(e) => {
                      e.preventDefault();
                      localStorage.getItem("receiverID") &&
                        setMessage(e.target.value);
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (message && localStorage.getItem("receiverID")) {
                        socket.emit("drop_message", {
                          senderID: userID,
                          receiverID: localStorage.getItem("receiverID"),
                          message: message,
                        });
                      } else {
                        alert("Select a user and enter a message to send.");
                      }
                    }}
                  >
                    send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
