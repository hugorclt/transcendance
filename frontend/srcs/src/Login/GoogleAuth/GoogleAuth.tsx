import React from "react";
import { useState, CSSProperties } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import axios from "../../axios";
import Cookies from "js-cookie";

function GoogleAuth() {
  const [isVisible, setIsVisible] = useState("none");
  const [isGood, setGood] = useState(true);
  const clientId: string = process.env["REACT_APP_GOOGLE_CLIENT_ID"]!;

  return (
    <div>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={async (credentialResponse: CredentialResponse) => {
            const response = await axios.post("/auth/google/login", {
              credential: credentialResponse.credential,
            });
            setGood(true);
            setIsVisible("block");
            const data = response.data;

            Cookies.set("authData", data);
            console.log(credentialResponse);
          }}
          onError={() => {
            setGood(false);
            setIsVisible("block");
          }}
        />
      </GoogleOAuthProvider>
      {isGood ? (
        <p
          className="text-green"
          style={
            {
              display: isVisible,
              color: "green",
            } as CSSProperties
          }
        >
          Success, try to connect!
        </p>
      ) : (
        <p
          className="text-red"
          style={
            {
              display: isVisible,
              color: "red",
            } as CSSProperties
          }
        >
          Failure! Try again.
        </p>
      )}
    </div>
  );
}

export default GoogleAuth;
