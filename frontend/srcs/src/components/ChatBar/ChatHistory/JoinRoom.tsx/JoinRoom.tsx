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

function JoinRoom() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const axiosPrivate = useAxiosPrivate()
  const [conv, setConv] = useAtom(conversationAtom);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axiosPrivate.post("/rooms/join", {name: name, password: password}).then((res: AxiosResponse) => {
      setConv((prev) => [res.data, ...prev]);
    }).catch((err: AxiosError) => {
      console.log("error while joining the room");
    })
  }

  return (
    <CreateRoomBox>
      <CreateRoomTitle>JOIN ROOM</CreateRoomTitle>
      <CreateRoomForm onSubmit={handleSubmit} autoComplete="off">
        <CreateRoomLabel htmlFor="name">Room name</CreateRoomLabel>
        <StyledInput
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          autoComplete="new-password"></StyledInput>
        <CreateRoomLabel htmlFor="password">Password</CreateRoomLabel>
        <StyledInput
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="new-password"></StyledInput>
        <CreateRoomButtonBox>
          <StyledButton type="submit" value="Join room" />
        </CreateRoomButtonBox>
      </CreateRoomForm>
    </CreateRoomBox>
  );
}

export default JoinRoom;
