import React from 'react'
import { useState } from 'react'

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  var handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3000/auth/login", {
        method: 'POST',
        headers: {
       'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setUsername('');
        setEmail('');
        setPassword('');
        console.log("OK!");
      } else {
        console.log("PAS OK!");
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div>
      <form action="" method="post" className="" onSubmit={handleSubmit}>
        <div className=''>
          <label >Username: </label>
          <input onChange={e => setUsername(e.target.value)} value={username} className='bg-slate-300' type="text" name="name" id="name" required />
        </div>
        <div className=''>
          <label>Email: </label>
          <input onChange={e => setEmail(e.target.value)} value={email} className='bg-slate-300' type="email" name="email" id="email" required />
        </div>
        <div className=''>
          <label>Password: </label>
          <input onChange={e => setPassword(e.target.value)} value={password} className='bg-slate-300' type="text" name="password" id="password" required />
        </div>
        <div >
          <input className='bg-slate-300' type="submit" value="Register" />
        </div>
      </form>
  </div>
  )
}

export default RegisterForm