import React, { useContext, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { ChatHistoryContext } from "../../../../views/ChatPage/ChatHistoryContext";
import { RoomModalOpenContext } from "../../../../views/ChatPage/RoomModalOpenContext";
import {
  StyledButton,
  StyledInput,
} from "../../FriendsList/FriendsTopBar/FriendsTopBarStyle";
import {
  CreateRoomBox,
  CreateRoomButtonBox,
  CreateRoomCheckBox,
  CreateRoomForm,
  CreateRoomLabel,
  CreateRoomTitle,
} from "../ChatHistoryStyle";

function CreateRoom() {
  const { open, setOpen } = useContext(RoomModalOpenContext);
  const [name, setName] = useState("");
  const [isPrivate, setPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const { chatHistory, setChatHistory } = useContext(ChatHistoryContext);
  const axiosPrivate = useAxiosPrivate();

  const handleCheck = () => {
    setPrivate(!isPrivate);
    if (!isPrivate) setPassword("");
  };

  return (
    <CreateRoomBox>
      <CreateRoomTitle>CREATE ROOM</CreateRoomTitle>
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
        <CreateRoomLabel htmlFor="checkbox">Is Public?</CreateRoomLabel>
        <CreateRoomCheckBox
          name="checkbox"
          checked={isPrivate}
          onChange={handleCheck}
          type="checkbox"></CreateRoomCheckBox>
        <CreateRoomButtonBox>
          <StyledButton type="submit" value="Create Room" />
        </CreateRoomButtonBox>
      </CreateRoomForm>
    </CreateRoomBox>
  );
}

export default CreateRoom;
