import React, { useState } from "react";
import "./Register.css";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";


function Register() {
  const [active, setActive] = useState("login"); 
  const changeActiveHandler = (value) => setActive(value);

  return (
    <div className="container">
      {active === "login" && (
        <Login changeActiveHandler={changeActiveHandler} />
      )}
      {active === "signup" && (
        <SignUp changeActiveHandler={changeActiveHandler} />
      )}
    </div>
  );
}

export default Register;
