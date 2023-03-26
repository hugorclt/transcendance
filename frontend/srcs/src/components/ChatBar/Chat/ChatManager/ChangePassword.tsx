import React from 'react'
import { ChangePasswordContainer } from './ChangePasswordStyle'

function ChangePassword() {
  return (
    <ChangePasswordContainer>
        <h3>Password</h3>
        <div>
            <h4>{"password"}</h4>
        </div>
        <h3>Change Password</h3>
        <input type="text" placeholder='New password'></input>
        <input type="text" placeholder='Confirm password'></input>
        <button>Change Password</button>
    </ChangePasswordContainer>
  )
}

export default ChangePassword