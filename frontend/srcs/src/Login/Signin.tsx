import React, { CSSProperties, useState } from "react";
import "./Login.css";
import LoginForm from "./LoginForm/LoginForm";
import Icon42 from "./Icon42";
import GoogleAuth from "./GoogleAuth/GoogleAuth";


function Signin() {
  return (
    <div>
      <div className="form-container sign-in-container">
        <h1>Sign in</h1>
        <div className="social-container">
          <GoogleAuth />
          <a href="http://localhost:3000/auth/google/login" className="social">
            <Icon42 />
          </a>
        </div>
        <span>or use your account</span>
        <LoginForm />
      </div>
    </div>
  );
}

export default Signin;
