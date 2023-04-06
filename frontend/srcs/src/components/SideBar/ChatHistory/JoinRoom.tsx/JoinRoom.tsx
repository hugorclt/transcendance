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
          <StyledButton type="submit" value="Join room" />
        </CreateRoomButtonBox>
      </CreateRoomForm>
    </CreateRoomBox>
  );
}

export default JoinRoom;
