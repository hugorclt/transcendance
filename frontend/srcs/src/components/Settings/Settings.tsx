import React, { FormEvent, useState } from "react";
import {
  PhotoContainer,
  SettingsContainer,
  SettingsLeft,
  SettingsRight,
} from "./Settings.style";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { getImageBase64 } from "../../services/utils/getImageBase64";
import { useAtom } from "jotai";
import { userAtom } from "../../services/store";

const renderGeneral = () => {
  const axiosPrivate = useAxiosPrivate();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [photo, setPhoto] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [user, setUser] = useAtom(userAtom);

  const handlePicture = (e: FormEvent) => {
    e.preventDefault();
    if (selectedFile || selectedFile != undefined) {
      let formData = new FormData();
      formData.append("picture", selectedFile, selectedFile.name);
      axiosPrivate
        .post("/users/update-picture", formData, {
          headers: {
            "content-type": selectedFile.type,
            "content-length": `${selectedFile.size}`,
          },
        })
        .then((res: AxiosResponse) => {
          console.log(res.data);
          setPhoto(getImageBase64(res.data.avatar));
        })
        .catch((err: AxiosError) => {
          setErrMsg("Error while uploading picture please retry");
        });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  return (
    <>
      <p>Import a new Profile Picture </p>
      <PhotoContainer src={photo == "" ? getImageBase64(user.avatar) : photo} />
      <form onSubmit={handlePicture}>
        <input onChange={handleFileChange} name="picture" type="file" />
        <button>Upload picture</button>
      </form>
      <p>Change username: </p>
      <form>
        <input placeholder="New username" type="text" />
        <button>Change Username</button>
      </form>
      <p>Change password: </p>
      <form>
        <input placeholder="New password" type="password" />
        <button>Change Password</button>
      </form>
      <p style={{ color: "red" }}>{errMsg}</p>
    </>
  );
};

const renderGame = () => {
  return <></>;
};

function Settings() {
  const [settingSelected, setSettingSelected] = useState("GENERAL");
  return (
    <SettingsContainer>
      <SettingsLeft>
        <h4 onClick={() => setSettingSelected("GENERAL")}>GENERAL</h4>
        <h4 onClick={() => setSettingSelected("GAME")}>GAME</h4>
      </SettingsLeft>
      <SettingsRight>
        {settingSelected == "GENERAL" ? renderGeneral() : renderGame()}
      </SettingsRight>
    </SettingsContainer>
  );
}

export default Settings;
