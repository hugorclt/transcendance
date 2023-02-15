import React, { CSSProperties } from 'react'
import { useState } from 'react'
import '../Login.css'
import Cookies from 'js-cookie'

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isGood, setIsGood] = useState(false);
  const [isVisible, setIsVisible] = useState<string>('hidden');

  var handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3000/auth/login", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      let resJson = await res.json();
      console.log(res.status);
      if (res.status >= 200 && res.status <= 204) {
        console.log("je passe ici");
        Cookies.set('access_token', resJson.access_token, { expire: 1 });
        setUsername('');
        setPassword('');
        setIsGood(true);
      } else {
        console.log("je passe la");
        setIsGood(false)
      }
      setIsVisible('visible');
    } catch (err) {
      setIsGood(false)
      setIsVisible('visible');
    }
  };

  return (
    <div>
      <form id="form-login" method='post' onSubmit={handleSubmit}>
        <input placeholder="Username" onChange={e => setUsername(e.target.value)} value={username} type="text" name="name" id="name" required />
        <input placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} type="password" name="password" id="password" required />
        {isGood ?
          <p className='text-green' style={{
            visibility: isVisible,
            color: "green",
          } as CSSProperties}
          >Success, try to connect!</p>
          :
          <p className='text-red' style={{
            visibility: isVisible,
            color: "red",
          } as CSSProperties}
          >Failure! Try again.</p>}
        <button form="form-login">Sign Up</button>
      </form>
    </div>
  )
}

export default LoginForm