import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { FormEvent, useContext, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { conversationAtom, friendAtom, userAtom } from "../../../../services/store";
import { updateArray } from "../../../../services/utils/updateArray";
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
import { RoomModalOpenContext } from "../../../../views/SideBarPage/RoomModalOpenContext";

type ParticipantState = {
  userId: string;
  role: string;
};

function CreateRoom() {
  const { open, setOpen } = useContext(RoomModalOpenContext);
  const [name, setName] = useState("");
  const [users, setUsers] = useState<ParticipantState[]>([]);
  const [isPrivate, setPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [friendList] = useAtom(friendAtom);
  const [chat, setChat] = useAtom(conversationAtom);
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useAtom(userAtom);

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

  function handleAddFriends(id: string) {
    const index = users.findIndex((user) => user.userId == id);
    if (index == -1) {
      setUsers((prev) => [...prev, { userId: id, role: "BASIC" }]);
    } else {
      if (users[index].role == "BASIC") {
        const updatedUsers = [...users];
        updatedUsers[index].role = "ADMIN";
        setUsers(updatedUsers);
      } else {
        const updatedUsers = users.filter((user) => user.userId !== id);
        setUsers(updatedUsers);
      }
    }
  }

  function chooseColor(id: string) {
    if (users.find((user) => user.userId == id)?.role == "BASIC")
      return "admin";
    else if (users.find((user) => user.userId == id)?.role == "ADMIN")
      return "callout";
    return "";
  }

  return (
    <>
      <CreateRoomFriends>
        <CreateRoomScroll>
          {friendList.map((val, index) => {
            return (
              <div key={index} onClick={() => handleAddFriends(val.id)}>
                <h4 key={index} className={chooseColor(val.id)}>
                  {val.username}
                </h4>
              </div>
            );
          })}
        </CreateRoomScroll>
      </CreateRoomFriends>
      <CreateRoomBox>
        <CreateRoomForm onSubmit={handleSubmit}>
          <StyledInput
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            autoComplete="new-password"
            placeholder="Room Name"
          ></StyledInput>
          <StyledInput
            name="password"
            value={password}
            disabled={isPrivate}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="new-password"
            placeholder="Password"
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
