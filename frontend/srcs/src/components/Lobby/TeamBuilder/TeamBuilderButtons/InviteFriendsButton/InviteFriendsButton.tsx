import { useAtom } from "jotai";
import React, { FormEvent, useState } from "react";
import Popup from "reactjs-popup";
import { COLORS } from "../../../../../colors";
import { friendAtom, lobbyAtom } from "../../../../../services/store";
import { TFriend } from "../../../../../services/type";
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
      .then((res: AxiosResponse) => {})
      .catch((error: AxiosError) => {
        console.log("error creating invitations");
      });
  };

  return (
    <InviteFriendButtonContainer>
      <Popup
        trigger={
          <RoundIconButton
            onClick={() => setOpen(true)}
            size={22}
            Icon={AddFriendIcon}
            disabled={lobby.state == "FULL" ? true : false}
          />
        }
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
                    friend={val}
                    onClick={() => handleAddFriends(val.id)}
                  />
                );
              })}
            </InviteFriendsListScroll>
          </InviteFriendsList>
          <StyledButton onClick={handleSubmit} type="submit" value="Invite" />
        </ModalBox>
      </Popup>
    </InviteFriendButtonContainer>
  );
}

export default InviteFriendsButton;
