import React from "react";
import "./Login.css";
// import RegisterForm from "./RegisterForm/RegisterForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import GoogleAuth from "./GoogleAuth/GoogleAuth";
import Icon42 from "./Icon42";

function Signup() {
  const url42: string = process.env["REACT_APP_42URL"]!

  return (
    <div>
      <div className="form-container sign-up-container">
        <h1>Create Account</h1>
        <div className="flex social-container">
          <GoogleAuth />
          <a href={url42} className="social">
            <Icon42 />
          </a>
        </div>
        <span>or use your email for registration</span>
        <RegisterForm />
      </div>
    </div>
  );
}

export default Signup;
