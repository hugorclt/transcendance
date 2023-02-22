import React from "react";
import { useState, CSSProperties } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  GoogleCredentialResponse,
} from "@react-oauth/google";
import axios from "../../../services/axios";
import { useNavigate, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { AxiosError, AxiosResponse } from "axios";

function GoogleAuth() {
  const [isVisible, setIsVisible] = useState("none");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const clientId: string = process.env["REACT_APP_GOOGLE_CLIENT_ID"]!;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; //where the user came from, if we can't get it, root
  const { setAuth } = useAuth();

  //----- DEFINING SUCCESS/ERROR MESSAGE ON SUBMIT -----
  const SubmitNote = () => {
    if (success) {
      return (
        <p
          className="text-green"
          style={
            {
              display: isVisible,
              color: "green",
            } as CSSProperties
          }
        >
          Login Success!
        </p>
      );
    } else {
      return (
        <p
          className="text-red"
          style={
            {
              display: isVisible,
              color: "red",
            } as CSSProperties
          }
        >
          {errMsg}
        </p>
      );
    }
  };

  var onSuccess = async (credentialResponse: GoogleCredentialResponse) => {
    await axios
      .post("/auth/google/login", {
        token: credentialResponse.credential,
      })
      .then((response: AxiosResponse) => {
        setSuccess(true);
        setIsVisible("block");
        const username = response?.data.username;
        const accessToken = response?.data.access_token;
        setAuth({ username, accessToken });
        navigate(from, { replace: true });
        navigate(from, { replace: true });
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  //----- Rendering -----
  return (
    <div>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          shape="circle"
          type="icon"
          onSuccess={onSuccess}
          onError={() => {
            setErrMsg("Google Auth failed");
            setSuccess(false);
            setIsVisible("block");
          }}
        />
      </GoogleOAuthProvider>
      <SubmitNote />
    </div>
  );
}

export default GoogleAuth;
