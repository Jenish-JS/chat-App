import React from "react";
import logo from"../assets/logo.png";

export default function Navbar(props) {
  return (
    <>
    <div>
            <img src={logo} alt="" className="img-fluid" width={"5%"} height={"5%"} />My App
  </div>
  </>
  );
}
