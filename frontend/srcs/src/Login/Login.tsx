import React from 'react'
import GoogleButton from 'react-google-button'
import axios from "axios";

const baseURL: string = "https://localhost:3000/";

function Login() {
  return (
    <div className="bg-white grid grid-cols-2 h-screen">
        <div className='flex justify-center h-screen items-center'>
          <GoogleButton
            onClick={() => { 
              axios.get(baseURL).then((response) => {
                console.log(response);
              })
            }}
          />
        </div>
        <h1 className='absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-8xl tracking-wider'>
          <span className='text-indigo-600'>O</span>
          <span className='text-white'>R</span>
        </h1>
        <h2 className="bg-indigo-600 flex justify-center h-screen items-center">
            <button className='bg-white text-slate-900 font-bold rounded py-2 px-4'>42 Connect</button>
        </h2>
    </div>
  )
}

export default Login