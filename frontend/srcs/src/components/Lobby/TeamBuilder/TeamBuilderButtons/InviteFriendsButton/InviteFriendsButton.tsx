import { useAtom } from "jotai";
import React, { FormEvent, useState } from "react";
import Popup from "reactjs-popup";
import { COLORS } from "../../../../../colors";
import { friendAtom, lobbyAtom } from "../../../../../services/store";
import InviteFriendCard from "./InviteFriendCard/InviteFriendCard";
import {
  InviteFriendButtonContainer,
  InviteFriendsList,
  InviteFriendsListScroll,
  ModalBox,
  StyledButton,
} from "./InviteFriendsButtonStyle";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import RoundIconButton from "../../../../common/Button/IconButton/RoundIconButton";
import AddFriendIcon from "../../../../../assets/icons/AddFriendIcon";

function InviteFriendsButton() {
  const [open, setOpen] = useState(false);
  const [invitedFriends, setInvitedFriends] = useState<string[]>([]);
  const [friendList, setFriendList] = useAtom(friendAtom);
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const axiosPrivate = useAxiosPrivate();

  function handleAddFriends(name: string) {
    if (!invitedFriends.includes(name)) {
      setInvitedFriends((prev) => [...prev, name]); //on ajoute le user a inviter
    } else {
      setInvitedFriends((prev) => prev.filter((user) => user !== name)); //on filtre les users pour supprimer l'user
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const invitations = invitedFriends.map((user) => {
      return { type: "LOBBY", userId: user, lobbyId: lobby.id };
    });
    axiosPrivate
      .post("/invitations/createMany", invitations)
      .then((res: AxiosResponse) => {
        setInvitedFriends([]);
      })
      .catch((error: AxiosError) => {
        console.log("error creating invitations");
      });
    setOpen(false);
  };

  function chooseColor(id: string) {
    if (invitedFriends.find((friend) => friend == id)) return COLORS.secondary;
    else return COLORS.darkergrey;
  }

  return (
    <InviteFriendButtonContainer>
      <RoundIconButton
        onClick={() => setOpen(true)}
        size={22}
        Icon={AddFriendIcon}
        disabled={lobby.state == "FULL" ? true : false}
      />
      <Popup
        onClose={() => {
          setOpen(false);
        }}
        modal
        open={open}
        nested
      >
        <ModalBox>
          <InviteFriendsList>
            <InviteFriendsListScroll>
              {friendList.map((val, index) => {
                return (
                  <InviteFriendCard
                    key={index}
                    friend={val}
                    onClick={() => handleAddFriends(val.id)}
                    style={{ backgroundColor: chooseColor(val.id) }}
                  />
                );
              })}
            </InviteFriendsListScroll>
          </InviteFriendsList>
          <StyledButton onClick={handleSubmit} type="submit">
            <h5>Invite</h5>
          </StyledButton>
        </ModalBox>
      </Popup>
    </InviteFriendButtonContainer>
  );
}

export default InviteFriendsButton;
