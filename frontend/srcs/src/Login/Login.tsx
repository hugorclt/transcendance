import React from 'react'
import axios from "axios";
import GoogleButton from 'react-google-button'
import RegisterForm from './RegisterForm/RegisterForm'

const baseURL: string = "http://localhost:3000/auth/google/login";

function Login() {
  var googleHandler = () => {
    try {
      window.open(baseURL, '_self');
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div>
        <RegisterForm />
        <br />
        <hr />
        <br />
        <form action="" method="get" className="">
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
        <GoogleButton onClick={googleHandler}/>
    </div>
  )
}

export default Login