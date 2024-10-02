import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../../style/Signup.css";
import logo from "../../assets/logo.png";


function Signup(props) {

  let [userData,setUSerData] = useState({
    name:"",
    email:"",
    password:""
  })

  let [apiCallFlag,setApiCallFlag] = useState(0)
  let navigator = useNavigate()

  
  useEffect(()=>{
    apiCalling(userData);
  },[apiCallFlag])

  function apiCalling(data){
    try {
      axios.post("http://localhost:7000/user/create/",data).then((rawData)=>{
        console.log("rawdata ===",rawData.data);
        navigator("/login");
      }).catch((err)=>{
        console.log("error ===",err)
      })
    } catch (error) {
      console.log("error in catch === ",error)
    }
  }

 
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
                <h2>Sign Up </h2>

                <div className="login-form-content">
                  {/* form start */}
                  <div className="one-frm">
                    <input type="text" name="name" placeholder="name" value={userData.name} required="" autoFocus onChange={(e)=>{
                      e.preventDefault();
                      setUSerData({...userData,name:e.target.value})
                    }} />
                  </div>
                  <div className="one-frm">
                    <input type="email" name="email" placeholder="Email" value={userData.email} required="" onChange={(e)=>{
                      e.preventDefault();
                      setUSerData({...userData,email:e.target.value})
                    }} />
                  </div>
                  <div className="one-frm">
                    <input type="password" name="Password" placeholder="Password" value={userData.password} required="" onChange={(e)=>{
                      e.preventDefault();
                      setUSerData({...userData,password:e.target.value})
                    }}/>
                  </div>
                  <button className="btn btn-style mt-3" type="submit" onClick={(e)=>{
                    e.preventDefault();
                    setApiCallFlag(++apiCallFlag)
                  }} >Submit</button>
                  {/* form end */}
                  <h2 className="link">
                    <Link to={"/login"} className="link">
                      Login
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright text-center">
          <div className="wrapper">
            <p className="copy-footer-29">
              &copy; 2024 My App Sugn Up form. All rights reserved | Design by{" "}
              My App
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
export default Signup;
