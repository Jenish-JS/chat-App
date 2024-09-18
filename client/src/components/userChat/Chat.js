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
  let [addUser,SetAddUser] = useState([]);
  let [selectUSer,setSelectUser] = useState("");
  let [message,setMessage] = useState("");
  let [sendMessage,setSendMessage] = useState([]);
  let [getAllUSer,setGetAllUSer] = useState([]);
  let [cughtMessage,setCughtMessage] = useState("");

  useEffect(() => {
    if (userID) {
      console.log("socket === ", socket);

      socket.on("all_user_get",(doc)=>{
        // console.log("get all user from server =====>",doc);
        setGetAllUSer([...doc]);
      })

      socket.on("searched_value", (doc) => {
        console.log("searched Data === ", doc);
        setUserSearchList(doc);
      });

      socket.on("send_message",(doc)=>{
        console.log("send message ==============>",doc);
        setSendMessage([...sendMessage,doc]);
      })

      socket.on("caught_message",(doc)=>{
        console.log("in caught message =====",doc);
        setCughtMessage(doc);
      })

      console.log("caught message ===",cughtMessage)
      // socket.on("catch_all_message",(doc)=>{
      //   doc.map((val)=>{
      //     console.log("catch all chats from seerver =====>",val.message);
      //   })  
      // })

      socket.on("get_all_chat",((doc)=>{
        console.log("in get all chats from server ======>",doc);
        setSendMessage([...doc]);
      }))
    } else {
      navigate("/login");
    }
  });

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
              <input type="text" list="usersname"name="userSearchInput" id="userSearchInput" placeholder="search" onChange={(e) => {
                  e.preventDefault();
                  console.log("in search user ===", e.target.value);
                  socket.emit("get_users", {
                    search: e.target.value,
                  });

                  userSearchList.filter((val)=>{
                    if(val.name === e.target.value){
                      localStorage.setItem("receiverID",(val.userID));
                        return setSelect(e.target.value);
                    }
                    e.target.value = "";
                    })
                }}
              />
              <button onClick={(e)=>{
                e.preventDefault()
                SetAddUser([...addUser,select]);
                setSelect("");
              }}>search</button>
              <datalist id="usersname">
                {userSearchList.map((val, idx) => {
                  console.log("value in map --> ", val.name);
                  return <option value={val.name} key={idx}></option>;
                })}
              </datalist>
            </div>
            <hr />
            <div id="userlist">
            {addUser.map((val, idx) => {
                  console.log("value in map --> ", val);
                  return <div className="userList"  key={idx} onClick={(e)=>{
                    e.preventDefault();
                    setSelectUser(`${val}`);
                    
                    const receiver = getAllUSer.filter((value)=>value.name === val)
                    const receiverID = receiver[0];
                    localStorage.setItem("receiverID",(receiverID.userID));
                    socket.emit("catch_all_message",{
                      senderID:localStorage.getItem("userID"),
                      receiverID:localStorage.getItem("receiverID")
                    })
                  }}>{val.name}{`${val}`}</div>;
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
              <div id="chatDiv" className="chatDiv">{(sendMessage !== "") && (sendMessage.map((val,idx)=>{
               return (val.senderID === localStorage.getItem("userID"))?
                (<div key={idx} className="message right-message"><span className="chat-span-text">{`${val.message}`}</span></div>):(<div key={idx} className="message"><span className="chat-span-text">{`${val.message}`}</span></div>)
              }))} </div>
              <div className="div5">
                <div id="chtInputDiv">
                  <input type="text" name="dropMessageInput" id="dropMessageInput" onChange={(e)=>{
                    e.preventDefault();
                    localStorage.getItem("receiverID") && setMessage(e.target.value);
                  }}/>
                  <button onClick={(e)=>{
                    e.preventDefault();
                    socket.emit("drop_message",{
                      senderID:userID,
                      receiverID:localStorage.getItem("receiverID"),
                      message:(message !== "") && (message)
                    })
                    // setMessage("");
                  }}>send</button>
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
