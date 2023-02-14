import React, { useRef } from 'react'
import RegisterForm from './RegisterForm/RegisterForm'
import './Login.css';
import { useState } from 'react';
import {FcGoogle} from 'react-icons/fc'

const baseURL: string = "http://localhost:3000/auth/google/login";

function Login() {
  const [isSignUp, setSignUp] = useState(true);

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className={isSignUp == false ? "container right-panel-active" : "container"} id="container">
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="http://localhost:3000/auth/google/login" className="social"><FcGoogle /></a>
            </div>
            <span>or use your email for registration</span>
            <RegisterForm />
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="http://localhost:3000/auth/google/login" className="social"><FcGoogle /></a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Blague nul sur pong#1</p>
              <button className="ghost" id="signIn" onClick={() => setSignUp(true)}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start playing now!</p>
              <button className="ghost" id="signUp" onClick={() => setSignUp(false)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
















  )
  {/* <RegisterForm />
        <br />
        <hr />
        <br />
        <form action="" method="get" classNameName="">
          <div className=''>
            <label >Username: </label>
            <input className='bg-slate-300' type="text" name="name" id="name" required />
          </div>
          <div className=''>
            <label>Password: </label>
            <input className='bg-slate-300' type="text" name="password" id="password" required />
          </div>
          <div >
            <input className='bg-slate-300' type="submit" value="Login" />
          </div>
        </form>
        <GoogleButton onClick={googleHandler}/> */}
    // </div>
}

export default Login