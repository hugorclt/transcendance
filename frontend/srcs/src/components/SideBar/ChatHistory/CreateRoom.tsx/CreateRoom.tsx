import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { FormEvent, useContext, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import {
  conversationAtom,
  friendAtom,
  userAtom,
} from "../../../../services/store";
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
  CreateRoomFriendsCards,
  CreateRoomFriendsCardsContainer,
  CreateRoomLabel,
  CreateRoomScroll,
  CreateRoomTitle,
} from "../ChatHistoryStyle";
import { RoomModalOpenContext } from "../../../../views/SideBarPage/RoomModalOpenContext";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { COLORS } from "../../../../colors";
import { MdAdminPanelSettings } from "react-icons/md";

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

  function handleAddAdmin(id: string) {
    const index = users.findIndex((user) => user.userId == id);
    if (index == -1) {
      setUsers((prev) => [...prev, { userId: id, role: "ADMIN" }]);
    } else {
      if (users[index].role == "ADMIN") {
        const updatedUsers = users.filter((user) => user.userId !== id);
        setUsers(updatedUsers);
      } else {
        const updatedUsers = [...users];
        updatedUsers[index].role = "ADMIN";
        setUsers(updatedUsers);
      }
    }
  }

  function handleAddUser(id: string) {
    const index = users.findIndex((user) => user.userId == id);
    if (index == -1) {
      setUsers((prev) => [...prev, { userId: id, role: "BASIC" }]);
    } else {
      if (users[index].role == "BASIC") {
        const updatedUsers = users.filter((user) => user.userId !== id);
        setUsers(updatedUsers);
      } else {
        const updatedUsers = [...users];
        updatedUsers[index].role = "BASIC";
        setUsers(updatedUsers);
      }
    }
  }

  function chooseColor(id: string) {
    if (users.find((user) => user.userId == id)?.role == "BASIC")
      return COLORS.border;
    else if (users.find((user) => user.userId == id)?.role == "ADMIN")
      return COLORS.secondary;
    return "";
  }

  return (
    <>
      <CreateRoomFriends>
        <CreateRoomScroll>
          {friendList.map((val, index) => {
            return (
              <CreateRoomFriendsCardsContainer
                key={index}
                style={{ backgroundColor: chooseColor(val.id) }}
              >
                <CreateRoomFriendsCards>
                  <h4 key={index}>{val.username}</h4>
                  <div>
                    <AiOutlinePlusSquare
                      onClick={() => handleAddUser(val.id)}
                      size={32}
                      color={COLORS.primary}
                      style={{ marginRight: "8px", cursor: "pointer" }}
                    />
                    <MdAdminPanelSettings
                      onClick={() => handleAddAdmin(val.id)}
                      size={32}
                      color={COLORS.primary}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </CreateRoomFriendsCards>
                <p>
                  {chooseColor(val.id) == COLORS.secondary
                    ? "invite as an administrator"
                    : ""}
                </p>
              </CreateRoomFriendsCardsContainer>
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
            <StyledButton onClick={() => setOpen(false)} type="submit" value="Create Room" />
          </CreateRoomButtonBox>
        </CreateRoomForm>
      </CreateRoomBox>
    </>
  );
}

export default CreateRoom;
