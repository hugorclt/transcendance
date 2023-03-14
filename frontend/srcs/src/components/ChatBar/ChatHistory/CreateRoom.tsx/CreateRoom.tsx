import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { FormEvent, useContext, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { friendAtom } from "../../../../services/store";
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
  const [users, setUser] = useState<string[]>([]);
  const [isPrivate, setPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [ friendList ] = useAtom(friendAtom);
  const axiosPrivate = useAxiosPrivate();

  const handleCheck = () => {
    setPrivate(!isPrivate);
    if (!isPrivate) setPassword("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axiosPrivate.post("/rooms/create", {
      name: name,
      password: password,
      users: users,
      isPrivate: isPrivate,
      isDm: false,
    }).then((res: AxiosResponse) => {
      console.log("Room succesfully created\n", res.data);
    }).catch((err: AxiosError) => {
      console.log("error while creating the room")
    })
    setPassword("");
    setName("");
    setOpen(false);
  };

  function handleAddFriends(name: string) {
    if (!users.includes(name)) {
      setUser((prev) => [...prev, name]);
    } else {
      setUser((prev) => prev.filter((user) => user !== name));
    }
  }

  return (
    <CreateRoomBox>
      <CreateRoomTitle>CREATE ROOM</CreateRoomTitle>
      <CreateRoomForm onSubmit={handleSubmit}>
        <div>
          {friendList.map((val, index) => {
            return (
              <div key={index} onClick={() => handleAddFriends(val.username)}>
                <p key={index} className={users.includes(val.username) ? "callout" : ""}>
                  {val.username}
                </p>
              </div>
            );
          })}
        </div>
        <CreateRoomLabel htmlFor="name">Room name</CreateRoomLabel>
        <StyledInput
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
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
