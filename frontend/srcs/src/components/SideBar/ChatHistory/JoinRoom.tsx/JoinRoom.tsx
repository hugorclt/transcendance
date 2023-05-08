import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { FormEvent, useContext, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { conversationAtom } from "../../../../services/store";
import {
  StyledButton,
  StyledInput,
} from "../../FriendsList/FriendsTopBar/FriendsTopBarStyle";
import {
  CreateRoomBox,
  CreateRoomButtonBox,
  CreateRoomForm,
  CreateRoomLabel,
  CreateRoomTitle,
} from "../ChatHistoryStyle";
import { RoomModalOpenContext } from "../../../../views/SideBarPage/RoomModalOpenContext";

function JoinRoom() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [conv, setConv] = useAtom(conversationAtom);
  const [errMsg, setErrMsg] = useState("");
  const { open, setOpen } = useContext(RoomModalOpenContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axiosPrivate
      .post("/rooms/join", { name: name, password: password })
      .then((res: AxiosResponse) => {
        setConv((prev) => [res.data, ...prev]);
      })
      .catch((err: AxiosError) => {
        console.log(err);
        if (err.response?.status == 404) setErrMsg("Room doesn't exist");
        else if (err.response?.status == 403)
          setErrMsg("Password doesn't match");
        else if (err.response?.status == 422) setErrMsg("You're already in!");
        else if (err.response?.status == 429) setErrMsg("You're banned :(");
      });
  };

  return (
    <CreateRoomBox>
      <CreateRoomForm onSubmit={handleSubmit} autoComplete="off">
        <StyledInput
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          autoComplete="new-password"
          placeholder="Room Name"></StyledInput>
        <StyledInput
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="new-password"
          placeholder="Password"></StyledInput>
        <CreateRoomButtonBox>
          <StyledButton onClick={() => setOpen(false)} type="submit" value="Join room" />
        </CreateRoomButtonBox>
      </CreateRoomForm>
      {errMsg.length != 0 ? <p style={{ color: "red" }}>{errMsg}</p> : <></>}
    </CreateRoomBox>
  );
}

export default JoinRoom;
