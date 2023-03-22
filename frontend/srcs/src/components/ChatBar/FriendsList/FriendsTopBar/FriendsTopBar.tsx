import React, { useState } from "react";
import { AiOutlineUsergroupAdd, AiOutlineSearch } from "react-icons/ai";
import { COLORS } from "../../../../colors";
import {
  AddFriendsForm,
  FriendsTopBarContainer,
  FriendsTopBarTitle,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    console.log("sending request");
    axiosPrivate
      .post("/invitations", { type: "FRIEND", username: username })
      .then((response: AxiosResponse) => {
        console.log("succesfully sent friend request");
        console.log("invitation sent: ", JSON.stringify(response.data));
      })
      .catch((error: AxiosError) => {
        console.log("failed sending friend request");
        console.log("error: ", JSON.stringify(error.message));
      });
    setUsername("");
  };

  return (
    <FriendsTopBarContainer>
      <FriendsTopBarTitle>FRIENDS</FriendsTopBarTitle>
      <RightFriendsTopBarBox>
        <Popup
          trigger={
            <div>
              <AiOutlineUsergroupAdd
                onClick={() => setOpen(true)}
                size={22}
                style={{ color: COLORS.secondary }}
              />
            </div>
          }
          modal
          open={open}
          nested
        >
          <ModalBox>
            <AddFriendsForm onSubmit={handleSubmit} autoComplete="off">
              <ModalTitle>ENTER USERNAME:</ModalTitle>
              <StyledInput
                onChange={(e) => setUsername(e.target.value)}
                type="text"
              ></StyledInput>
              <StyledButton type="submit" value="Invite" />
            </AddFriendsForm>
          </ModalBox>
        </Popup>
        <AiOutlineSearch size={22} style={{ color: COLORS.secondary }} />
      </RightFriendsTopBarBox>
    </FriendsTopBarContainer>
  );
}

export default FriendsTopBar;
