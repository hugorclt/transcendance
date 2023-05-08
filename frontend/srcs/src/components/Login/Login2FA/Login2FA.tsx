import React, { useState } from "react";
import { Form2FaContainer, Login2FAContainer } from "./Login2FA.style";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/store";
import { useLocation, useNavigate } from "react-router";

function Login2FA() {
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useAtom(userAtom);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; //where the user came from, if we can't get it, root



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axiosPrivate
      .post("auth/2fa/authenticate", {userId: user.id, code: code, username: user.username})
      .then((res: AxiosResponse) => {
        setCode("");
        const accessToken = res?.data?.access_token;
        setUser((prev) => ({
          ...prev,
          accessToken: accessToken,
        }));
        navigate(from, { replace: true });
      })
      .catch((err: AxiosError) => {
        setCode("");
        setErrMsg("Invalid code try again");
      });
  };

  return (
    <Login2FAContainer>
      <Form2FaContainer>
        <h4>Google authenticator</h4>
        <p>
          2FA is enabled on your account, please enter your <br />
          google authenticator code to confirm it's really
          <br /> you!
        </p>
        <form onSubmit={handleSubmit}>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code"></input>
        </form>
      </Form2FaContainer>
      {errMsg.length > 0 ? <p style={{ color: "red" }}>{errMsg}</p> : <></>}
    </Login2FAContainer>
  );
}

export default Login2FA;
