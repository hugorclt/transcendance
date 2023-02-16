import React, { useRef } from 'react'
import RegisterForm from './RegisterForm/RegisterForm'
import LoginForm from './LoginForm/LoginForm';
import './Login.css';
import { useState } from 'react';
import Signup from './Signup';
import Signin from './Signin';
import Loading from '../Loading/Loading';

function Login() {
  const [isSignUp, setSignUp] = useState(true);

  return (
    <div className='login-body flex flex-col justify-center items-center h-screen'>
      <div className={isSignUp == false ? "transition duration-250 hover:scale-110 container right-panel-active" : "transition duration-250 hover:scale-110 container"} id="container">
        <Signup />
        <Signin />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Ping</p>
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