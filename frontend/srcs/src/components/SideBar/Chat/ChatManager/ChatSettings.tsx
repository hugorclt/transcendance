import React, { FormEvent, useEffect, useState } from "react";
import {
  ChangeImageContainer,
  ChangePasswordContainer,
  InputButtonContainer,
  PasswordContainer,
} from "./ChangePasswordStyle";
import { getImageBase64 } from "../../../../services/utils/getImageBase64";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { TChatProps } from "../ChatType";
import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { conversationAtom } from "../../../../services/store";
import { updateArray } from "../../../../services/utils/updateArray";

function ChatSettings({ chat }: TChatProps) {
  const [conv, setConv] = useAtom(conversationAtom);
  const [newName, setNewName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [photo, setPhoto] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleName = (e: FormEvent) => {
    e.preventDefault();
    axiosPrivate
      .post("/rooms/update-name", { newName, roomId: chat.id })
      .then((res: AxiosResponse) => {
        setConv((prev) => updateArray(prev, res.data));
      })
      .catch((err: AxiosError) => {
        setErrMsg("Error while changing name, retry");
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handlePhoto = (e: FormEvent) => {
    e.preventDefault();
    if (selectedFile || selectedFile != undefined) {
      let formData = new FormData();
      formData.append("picture", selectedFile, chat.id);
      axiosPrivate
        .post("/rooms/update-picture", formData, {
          headers: {
            "content-type": selectedFile.type,
            "content-length": `${selectedFile.size}`,
          },
        })
        .then((res: AxiosResponse) => {
          setPhoto(getImageBase64(res.data.avatar));
        })
        .catch((err: AxiosError) => {
          setErrMsg("Error while uploading picture please retry");
        });
    }
  };

  const changePassword = (e: FormEvent) => {
    e.preventDefault();
    axiosPrivate.post("rooms/update-password", {roomId: chat.id, password: newPassword, confirm: confirmPassword})
    .then((res: AxiosResponse) => {

    }).catch((err: AxiosError) => {
      setErrMsg("Error while changing password please retry");
    })
  }

  return (
    <ChangePasswordContainer>
      <h3>Settings</h3>
      <ChangeImageContainer>
        <form onSubmit={handlePhoto}>
          <input onChange={handleFileChange} name="picture" type="file" />
          <button>Change photo</button>
        </form>
      </ChangeImageContainer>
      <h4>Change room name</h4>
      <InputButtonContainer>
        <form onSubmit={handleName}>
          <input
            required
            value={newName}
            type="text"
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New room name"></input>
          <button onClick={handleName}>Change name</button>
        </form>
      </InputButtonContainer>
      <h4>Change password</h4>
      <InputButtonContainer>
        <form onSubmit={changePassword}>
          <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required type="text" placeholder="New password"></input>
          <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required type="text" placeholder="Confirm password"></input>
          <button>Change Password</button>
        </form>
      </InputButtonContainer>
      {errMsg.length != 0 ? <p style={{ color: "red" }}>{errMsg}</p> : <></>}
    </ChangePasswordContainer>
  );
}

export default ChatSettings;
