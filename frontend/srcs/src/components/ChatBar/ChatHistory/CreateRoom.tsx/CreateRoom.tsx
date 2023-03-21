import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { FormEvent, useContext, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { conversationAtom, friendAtom } from "../../../../services/store";
import { updateArray } from "../../../../services/utils/updateArray";
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
  CreateRoomFriends,
  CreateRoomLabel,
  CreateRoomScroll,
  CreateRoomTitle,
} from "../ChatHistoryStyle";

type ParticipantState = {
  username: string;
  role: string;
};

function CreateRoom() {
  const { open, setOpen } = useContext(RoomModalOpenContext);
  const [name, setName] = useState("");
  const [users, setUser] = useState<ParticipantState[]>([]);
  const [isPrivate, setPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [friendList] = useAtom(friendAtom);
  const [chat, setChat] = useAtom(conversationAtom);
  const axiosPrivate = useAxiosPrivate();

  const handleCheck = () => {
    setPrivate(!isPrivate);
    if (!isPrivate) setPassword("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axiosPrivate
      .post("/rooms/create", {
        name: name,
        password: password,
        users: users,
        isPrivate: isPrivate,
        isDm: false,
      })
      .then((res: AxiosResponse) => {
        console.log("Room succesfully created\n", res.data);
        setChat((prev) => updateArray(prev, res.data));
      })
      .catch((err: AxiosError) => {
        console.log("error while creating the room");
      });
    setPassword("");
    setName("");
    setOpen(false);
  };

  function handleAddFriends(name: string) {
    const index = users.findIndex((user) => user.username == name);
    if (index == -1) {
      setUser((prev) => [...prev, { username: name, role: "BASIC" }]);
    } else {
      if (users[index].role == "BASIC") {
        const updatedUsers = [...users];
        updatedUsers[index].role = "ADMIN";
        setUser(updatedUsers);
      } else {
        const updatedUsers = users.filter((user) => user.username !== name);
        setUser(updatedUsers);
      }
    }
  }

  function chooseColor(username: string) {
    if (users.find((user) => user.username == username)?.role == "BASIC")
      return "admin";
    else if (users.find((user) => user.username == username)?.role == "ADMIN")
      return "callout";
    return "";
  }

  return (
    <>
      <CreateRoomFriends>
        <h3>Friends</h3>
        <CreateRoomScroll>
          {friendList.map((val, index) => {
            return (
              <div key={index} onClick={() => handleAddFriends(val.username)}>
                <p key={index} className={chooseColor(val.username)}>
                  {val.username}
                </p>
              </div>
            );
          })}
        </CreateRoomScroll>
      </CreateRoomFriends>
      <CreateRoomBox>
        <CreateRoomTitle>CREATE ROOM</CreateRoomTitle>
        <CreateRoomForm onSubmit={handleSubmit}>
          <CreateRoomLabel htmlFor="name">Room name</CreateRoomLabel>
          <StyledInput
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            autoComplete="new-password"
          ></StyledInput>
          <CreateRoomLabel htmlFor="password">Password</CreateRoomLabel>
          <StyledInput
            name="password"
            value={password}
            disabled={isPrivate}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="new-password"
          ></StyledInput>
          <CreateRoomLabel htmlFor="checkbox">Is Public?</CreateRoomLabel>
          <CreateRoomCheckBox
            name="checkbox"
            checked={isPrivate}
            onChange={handleCheck}
            type="checkbox"
          ></CreateRoomCheckBox>
          <CreateRoomButtonBox>
            <StyledButton type="submit" value="Create Room" />
          </CreateRoomButtonBox>
        </CreateRoomForm>
      </CreateRoomBox>
    </>
  );
}

export default CreateRoom;
