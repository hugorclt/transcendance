import React, { useEffect, useState } from "react";
import { AuthFormContainer, LoginFormContainer } from "./AuthForm.style";
import Form from "../../common/Form/Form";
import FormTopper from "./FormTopper/FormTopper";
import HeptaButton from "../../common/Button/HeptaButton/HeptaButton";
import { axiosClient } from "../../../services/axios";
import { useGlobal } from "../../../services/Global/GlobalProvider";
import { AxiosError, AxiosResponse } from "axios";
import { useLocation, useNavigate } from "react-router";
import { TFormData } from "../../common/Form/TForm";

const initialValue = {
  username: "",
  password: "",
  email: "",
};

function AuthForm() {
  const [isRegister, setIsRegister] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { auth, setAuth } = useGlobal();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; //where the user came from, if we can't get it, root
  const [formData, setFormData] = useState<TFormData>(initialValue);
  const clientId: string = import.meta.env["VITE_GOOGLE_CLIENT_ID"]!;

  const handleSubmit = (e: React.FormEvent) => {
    if (!formData.username || !formData.password) return;
    e.preventDefault();
    axiosClient()
      .post(
        isRegister ? "/auth/login" : "/auth/register",
        isRegister
          ? {
              username: formData.username,
              password: formData.password,
            }
          : {
              username: formData.username,
              password: formData.password,
              email: formData.email,
            }
      )
      .then((response: AxiosResponse) => {
        setSuccess(true);
        const accessToken = response?.data?.access_token;
        setAuth({ username: formData.username, accessToken });
        setFormData(initialValue);
        navigate(from, { replace: true });
      })
      .catch((error: AxiosError) => {
        if (!error?.response) {
          setErrMsg("No server response");
        } else if (error.response?.status === 400) {
          setErrMsg("Missing username or password");
        } else if (error.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        setSuccess(false);
      });
  };

  const SubmitNote = () => {
    if (success == false && errMsg == "") return <></>;
    return <p style={{ color: success ? "green" : "red" }}>{errMsg}</p>;
  };

  return (
    <>
      <AuthFormContainer>
        <FormTopper
          clientId={clientId}
          isRegister={isRegister}
          setIsRegister={setIsRegister}
        />
        <LoginFormContainer>
          <Form setFormData={setFormData} formData={formData}>
            <input key="name" type="text" placeholder="Username" required></input>
            <input key="password" type="password" placeholder="Password" required></input>
            {isRegister ? (
              <></>
            ) : (
              <input key="email" type="email" placeholder="Email" required></input>
            )}
          </Form>
          <HeptaButton onClick={handleSubmit} width={120} height={90} text="LOGIN" />
          <SubmitNote />
        </LoginFormContainer>
      </AuthFormContainer>
    </>
  );
}

export default AuthForm;
