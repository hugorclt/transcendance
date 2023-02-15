import React from 'react'
import { useState } from 'react' 
import '../Login.css'

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isGood, setIsGood] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  var handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3000/auth/register", {
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
      <form id="form-register" method='post' onSubmit={handleSubmit}>
          <input placeholder="Username" onChange={e => setUsername(e.target.value)} value={username} type="text" name="name" id="name" required />
          <input placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}  type="email" name="email" id="email" required />
          <input placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} type="password" name="password" id="password" required />
          {isGood ? <p></p> : <p></p>}
          <button form="form-register">Sign Up</button>
      </form>
  </div>
  )
}

export default RegisterForm