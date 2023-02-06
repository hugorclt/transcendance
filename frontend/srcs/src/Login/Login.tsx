import React from 'react'

function Login() {
  return (
    <div className="bg-white grid grid-cols-2 h-screen">
        <div>
            <h2 className="text-indigo-600">Login with 2FA</h2>
            <form>
                <label className="text-indigo-600">Email</label>
                <input type="text"></input>
                <label className="text-indigo-600">Password</label>
                <input type="text"></input>
                <button className="bg-indigo-600">Login</button>
            </form>
        </div>
        <h2 className="bg-indigo-600">
            <h2 className="text-white">Login with 42connect</h2>
            <button className="bg-white">42connect</button>
        </h2>
    </div>
  )
}

export default Login