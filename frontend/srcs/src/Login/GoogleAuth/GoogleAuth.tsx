import React from "react";
import { useState, CSSProperties } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
  GoogleCredentialResponse,
} from "@react-oauth/google";
import axios from "../../axios";
import { useNavigate, useLocation } from "react-router";

function GoogleAuth() {
  const [isVisible, setIsVisible] = useState("none");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const clientId: string = process.env["REACT_APP_GOOGLE_CLIENT_ID"]!;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; //where the user came from, if we can't get it, root

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

  var onSuccess = async (credentialResponse : GoogleCredentialResponse) => {
    const response = await axios.post("/auth/google/login", {
      token: credentialResponse.credential,
    });
    setSuccess(true);
    setIsVisible("block");
    navigate(from, { replace: true });
  }

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
