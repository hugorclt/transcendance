import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Fa2Container } from "../Settings.style";
import { AxiosError, AxiosResponse } from "axios";
import { getImageBase64 } from "../../../services/utils/getImageBase64";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/store";

function F2A() {
  const axiosPrivate = useAxiosPrivate();
  const [is2fa, setIs2fa] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [msg, setMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [code, setCode] = useState("");
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    axiosPrivate.get("/users/is2fa").then((res) => {
      setIs2fa(res.data);
    });
  }, []);

  const change2Fa = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked == false)
      axiosPrivate.post("/users/set2fa", { activated: false });
    else
      axiosPrivate
        .get("/auth/generate")
        .then((res: AxiosResponse) => {
          console.log(res.data);
          setQrCode(res.data);
        })
        .catch((err: AxiosError) => {});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axiosPrivate
      .post("auth/2fa/turn-on", { code: code })
      .then(() => {
        setQrCode("");
        setCode("");
        setUser((prev) => ({
          ...prev,
          accessToken: "",
        }));
        setMsg("2FA Enabled");
      })
      .catch((err: AxiosError) => {
        setErrMsg("Invalid code try again");
      });
  };

  return (
    <>
      <Fa2Container>
        <p>Enable Google Authenticator 2FA</p>
        <input
          onChange={(e) => change2Fa(e)}
          defaultChecked={is2fa}
          type="checkbox"
        />
      </Fa2Container>
      {qrCode.length > 0 && (
        <>
          <img src={`${qrCode}`} />
          <p>Enter your code from google authenticator application</p>
          <form onSubmit={handleSubmit}>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code"></input>
          </form>
          {errMsg.length > 0 ? <p style={{ color: "red" }}>{errMsg}</p> : <></>}
        </>
      )}
      {msg.length > 0 ? <p style={{ color: "green" }}>{msg}</p> : <></>}
    </>
  );
}

export default F2A;
