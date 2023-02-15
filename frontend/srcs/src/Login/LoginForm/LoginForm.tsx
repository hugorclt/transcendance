import React from 'react'
import { useState } from 'react' 
import '../Login.css'

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isGood, setIsGood] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
          password: password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setUsername('');
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
      <form id="form-login" method='post' onSubmit={handleSubmit}>
          <input placeholder="Username" onChange={e => setUsername(e.target.value)} value={username} type="text" name="name" id="name" required />
          <input placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} type="password" name="password" id="password" required />
          {isGood ? <p></p> : <p></p>}
          <button form="form-login">Sign Up</button>
      </form>
  </div>
  )
}

export default LoginForm