import React from "react";
import "./Login.css";
import RegisterForm from "./RegisterForm/RegisterForm";
import Register from "../newComponents/Register";
import GoogleAuth from "./GoogleAuth/GoogleAuth";
import Icon42 from "./Icon42";

function Signup() {
  return (
    <div>
      <div className="form-container sign-up-container">
        <h1>Create Account</h1>
        <div className="social-container">
          <GoogleAuth />
          <a href="http://localhost:3000/auth/google/login" className="social">
            <Icon42 />
          </a>
        </div>
        <span>or use your email for registration</span>
        {/* <RegisterForm /> */}
        <Register />
      </div>
    </div>
  );
}

export default Signup;
