import React from "react";
import { useState, CSSProperties } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  GoogleCredentialResponse,
} from "@react-oauth/google";
import axios from "../../../services/axios";
import { useNavigate, useLocation } from "react-router";
import { AxiosError, AxiosResponse } from "axios";
import { SocialContainer } from "../AuthForm/AuthForm.style";
import { COLORS } from "../../../colors";
import { useGoogleLogin } from "@react-oauth/google";
import { BsGoogle } from "react-icons/bs";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/store";

function GoogleAuth() {
  const [isVisible, setIsVisible] = useState("none");
  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; //where the user came from, if we can't get it, root
  const [user, setUser] = useAtom(userAtom);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      onSuccess(codeResponse);
    },
    flow: "auth-code",
  });

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

  var onSuccess = async (credentialResponse) => {
    await axios
      .post("/auth/google/login", {
        token: credentialResponse.code,
      })
      .then((response: AxiosResponse) => {
        if (response.data.is2fa == true) {
          setUser((prev) => ({
            ...prev,
            ...response.data,
          }));
          navigate("/login/2fa", { replace: true });
        } else {
          setSuccess(true);
          setIsVisible("block");
          const accessToken = response?.data.access_token;
          setUser((prev) => ({
            ...prev,
            accessToken: accessToken,
          }));
          navigate("/", { replace: true });
        }
      })
      .catch((error: AxiosError) => {
        setErrMsg("Error connecting to Google Server");
      });
  };

  //----- Rendering -----
  return (
    <SocialContainer onClick={() => login()}>
      <button>
        <BsGoogle size={24} color={COLORS.lightgrey} />
      </button>
      <SubmitNote />
    </SocialContainer>
  );
}

export default GoogleAuth;
