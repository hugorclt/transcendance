import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { FormEvent, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { userAtom } from "../../../services/store";
import { getImageBase64 } from "../../../services/utils/getImageBase64";
import { PhotoContainer } from "../Settings.style";

function General() {
  const axiosPrivate = useAxiosPrivate();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [photo, setPhoto] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [user, setUser] = useAtom(userAtom);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const handleUsername = (e: FormEvent) => {
    e.preventDefault();
    axiosPrivate
      .post("/users/update-username", { username: username })
      .then((res: AxiosResponse) => {
        setUser((prev) => ({ ...prev, username: username }));
      })
      .catch((err) => {
        setErrMsg("Error while setting username please retry");
      });
  };

  const handlePassword = (e: FormEvent) => {
    e.preventDefault();
    axiosPrivate
      .post("/users/update-password", { password: password })
      .then((res: AxiosResponse) => {})
      .catch((err) => {
        setErrMsg("Error while setting password please retry");
      });
  };

  return (
    <>
      <p>Import a new Profile Picture </p>
      <PhotoContainer src={photo == "" ? getImageBase64(user.avatar) : photo} />
      <form onSubmit={handlePicture}>
        <input  style={{ cursor: "pointer" }} onChange={handleFileChange} name="picture" type="file" />
        <button style={{ cursor: "pointer" }}>Upload picture</button>
      </form>
      <p>Change username: </p>
      <form onSubmit={handleUsername}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="New username"
          type="text"
        />
        <button style={{ cursor: "pointer" }}>Change Username</button>
      </form>
      <p>Change password: </p>
      <form onSubmit={handlePassword}>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          type="password"
        />
        <button style={{ cursor: "pointer" }}>Change Password</button>
      </form>
      <p style={{ color: "red" }}>{errMsg}</p>
    </>
  );
}

export default General;
