import React, { useContext, useRef, useState } from "react";
import { AiOutlineUsergroupAdd, AiOutlineSearch } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { COLORS } from "../../../../colors";
import { SocketContext } from "../../../../services/Auth/SocketContext";
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

function FriendsTopBar() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const socket = useContext(SocketContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    console.log("sending request");
    socket?.emit("friend-request", username);
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
          nested>
          <ModalBox>
            <AddFriendsForm onSubmit={handleSubmit} autoComplete="off">
              <ModalTitle>ENTER USERNAME:</ModalTitle>
              <StyledInput
                onChange={(e) => setUsername(e.target.value)}
                type="text"></StyledInput>
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
