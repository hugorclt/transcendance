import React from "react";
import { useState, CSSProperties } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import axios from "../../axios";
import { useNavigate } from "react-router";

function GoogleAuth() {
  const [isVisible, setIsVisible] = useState("none");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const clientId: string = process.env["REACT_APP_GOOGLE_CLIENT_ID"]!;
  const navigate = useNavigate();

  //----- DEFINING SUCCESS/ERROR MESSAGE ON SUBMIT -----
  const SubmitNote = () => {
    if (success) {
      return (
        <p
          className="text-green"
          style={
            {
              visibility: isVisible,
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
              visibility: isVisible,
              color: "red",
            } as CSSProperties
          }
        >
          {errMsg}
        </p>
      );
    }
  };

  //----- Rendering -----
  return (
    <div>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={async (credentialResponse: CredentialResponse) => {
            const response = await axios.post("/auth/google/login", {
              token: credentialResponse.credential,
            });
            setSuccess(true);
            setIsVisible("block");
            navigate("/");
          }}
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
