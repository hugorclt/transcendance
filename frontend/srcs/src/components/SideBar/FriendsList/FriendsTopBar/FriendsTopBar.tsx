import React, { useEffect, useState } from "react";
import {
  AiOutlineUsergroupAdd,
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";
import { COLORS } from "../../../../colors";
import {
  AddFriendsForm,
  FriendsTopBarContainer,
  ModalBox,
  RightFriendsTopBarBox,
  StyledInput,
  StyledButton,
  ModalTitle,
} from "./FriendsTopBarStyle";
import Popup from "reactjs-popup";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";

function FriendsTopBar() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = () => {
    setOpen(false);
    axiosPrivate
      .post("/invitations", { type: "FRIEND", username: username })
      .then((response: AxiosResponse) => {
        console.log("succesfully sent friend request");
      })
      .catch((error: AxiosError) => {
        console.log("error: ", JSON.stringify(error.message));
      });
    setUsername("");
  };

  return (
    <FriendsTopBarContainer>
      {open ? (
        <>
          <input
            type="text"
            placeholder="Invite user"
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") handleSubmit();
            }}></input>
          <AiOutlineClose
            size={24}
            color={COLORS.secondary}
            onClick={() => setOpen(false)}
          />
        </>
      ) : (
        <>
          <h4>FRIENDS</h4>
          <RightFriendsTopBarBox>
            <AiOutlineUsergroupAdd
              onClick={() => setOpen(true)}
              size={22}
              color={COLORS.secondary}
            />
            <AiOutlineSearch size={22} color={COLORS.secondary} />
          </RightFriendsTopBarBox>
        </>
      )}
    </FriendsTopBarContainer>
  );
}

export default FriendsTopBar;
