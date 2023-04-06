import React, { FormEvent, useState } from "react";
import {
  PhotoContainer,
  SettingsContainer,
  SettingsLeft,
  SettingsRight,
} from "./Settings.style";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const renderGeneral = () => {
  const axiosPrivate = useAxiosPrivate();
  const [selectedFile, setSelectedFile] = useState<FileList>();

  const handlePicture = (e: FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      axiosPrivate.post("/users/update-picture", selectedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files);
    }
  };
  return (
    <>
      <p>Import a new Profile Picture </p>
      <PhotoContainer />
      <form onSubmit={handlePicture}>
        <input
          onChange={handleFileChange}
          name="picture"
          type="file"
        />
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
