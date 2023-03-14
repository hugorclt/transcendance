import React, { useContext, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
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
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isPrivate, setPrivate] = useState(false);
  const [password, setPassword] = useState("");

  const handleCheck = () => {
    setPrivate(!isPrivate);
    if (!isPrivate) setPassword("");
  };

  return (
    <CreateRoomBox>
      <CreateRoomTitle>JOIN ROOM</CreateRoomTitle>
      <CreateRoomForm autoComplete="off">
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
          disabled={isPrivate}
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
