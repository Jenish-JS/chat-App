import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../../style/Login.css";
import logo from "../../assets/logo.png";


function Login() {

  let [userData,setUserData] = useState({
    email:"",
    password:""
  })

  let [apiCallFlag,setApiCallFlag] = useState(0)

  useEffect(()=>{
    apiCalling(userData)
  },[apiCallFlag])

  function apiCalling(data){
    try {
      axios.post("http://localhost:7000/auth/login/",data).then((rawData)=>{
        console.log("rawData === ",rawData.data);
        localStorage.setItem("userID",(rawData.data?.data.userID));
        console.log("userId === ",rawData);
        navigator("/chat");
      }).catch((err)=>{
        console.log("error in login ",err)
      })
    } catch (error) {
      console.log("error in user login catch",error);
    }
  }

  let navigator = useNavigate()
  return (
    <>
      <section className="w3l-workinghny-form">
        <div className="workinghny-form-grid">
          <div className="wrapper">
            <div className="logo">
              <h1>
                <img src={logo} alt="logo" className="brand-logo" />
              </h1>
            </div>
            <div className="workinghny-block-grid">
              <div className="form-right-inf">
                <h2>Login</h2>
                <div className="login-form-content">
                  
                    <div className="one-frm">
                      <input type="email" name="Email" placeholder="Email" value={userData.email} required="" autoFocus onChange={(e)=>{
                        e.preventDefault();
                        setUserData({...userData,email:e.target.value});
                      }}
                      />
                    </div>
                    <div className="one-frm">
                      <input
                        type="password" name="Password" placeholder="Password" required="" value={userData.password} onChange={(e)=>{
                          e.preventDefault();
                          setUserData({...userData,password:e.target.value})
                        }} />
                    </div>
                    <button className="btn btn-style mt-3" onClick={(e)=>{
                      e.preventDefault();
                      setApiCallFlag(++apiCallFlag);
                    }}>Login </button>
      
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright text-center">
          <div className="wrapper">
            <p className="copy-footer-29">
              &copy; 2024 My App Sugn Up form. All rights reserved | Design by{" "}
              ChatApp
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
