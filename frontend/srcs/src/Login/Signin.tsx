import React from "react";
import "./Login.css";
import LoginForm from "./LoginForm/LoginForm";
import { FcGoogle } from "react-icons/fc";
import logo42 from '../assets/42.jpg';

function Signin() {
  return (
    <div>
      <div className="form-container sign-in-container">
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="http://localhost:3000/auth/google/login" className="social">
            <FcGoogle />
          </a>
          <a href="http://localhost:3000/auth/google/login" className="social">
            <img width="500" src={logo42} alt="logo42" />
          </a>
        </div>
        <span>or use your account</span>
        <LoginForm />
      </div>
    </div>
  );
}

export default Signin;
