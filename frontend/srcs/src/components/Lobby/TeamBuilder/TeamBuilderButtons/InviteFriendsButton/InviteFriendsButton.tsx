import { useAtom } from "jotai";
import React, { FormEvent, useState } from "react";
import Popup from "reactjs-popup";
import { COLORS } from "../../../../../colors";
import {
  conversationAtom,
  friendAtom,
  lobbyAtom,
  userAtom,
} from "../../../../../services/store";
import InviteFriendCard from "./InviteFriendCard/InviteFriendCard";
import {
  InviteChatListScroll,
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
import InviteChatCard from "./InviteChatCard/InviteChatCard";
import { TConversation } from "../../../../../services/type";

type TInvitation = {
  type: string;
  userId: string;
  lobbyId: string;
};

function InviteFriendsButton() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const [errMsg, setErrMsg] = useState<string>("");
  const [invitedFriends, setInvitedFriends] = useState<string[]>([]);
  const [invitedChat, setInvitedChat] = useState<TConversation[]>([]);
  const [friendList, setFriendList] = useAtom(friendAtom);
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [chat, setChat] = useAtom(conversationAtom);
  const axiosPrivate = useAxiosPrivate();

  function handleAddFriends(name: string) {
    if (!invitedFriends.includes(name)) {
      setInvitedFriends((prev) => [...prev, name]); //on ajoute le user a inviter
    } else {
      setInvitedFriends((prev) => prev.filter((user) => user !== name)); //on filtre les users pour supprimer l'user
    }
  }

  function handleAddChat(chatRoom: any) {
    if (!invitedChat.includes(chatRoom)) {
      setInvitedChat((prev) => [...prev, chatRoom]);
    } else {
      setInvitedChat((prev) => prev.filter((el) => el !== chatRoom));
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const invitationList = new Array<TInvitation>();
    invitedFriends.forEach((user) => {
      if (invitationList.find((invit) => invit.userId === user)) return;
      invitationList.push({ type: "LOBBY", userId: user, lobbyId: lobby.id });
    });
    invitedChat.forEach((chat) => {
      chat.participants.forEach((participant) => {
        if (invitationList.find((invit) => invit.userId === participant.id))
          return;
        invitationList.push({
          type: "LOBBY",
          userId: participant.id,
          lobbyId: lobby.id,
        });
      });
    });
    const invitations = invitationList.filter(
      (invit) => invit.userId !== user.id
    );
    axiosPrivate
      .post("/invitations/createMany", invitations)
      .then((res: AxiosResponse) => {
        setErrMsg("");
        setInvitedFriends([]);
      })
      .catch((error: AxiosError) => {
        setErrMsg("Error creating invitations");
      });
    setOpen(false);
  };

  function chooseColor(id: string) {
    if (invitedFriends.find((friend) => friend == id)) return COLORS.secondary;
    else return COLORS.darkergrey;
  }

  function chooseChatColor(id: string) {
    if (invitedChat.find((chat) => chat.id == id)) return COLORS.secondary;
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
          <h2>Friends</h2>
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
          <h2>Conversations</h2>
          <InviteFriendsList>
            <InviteChatListScroll>
              {chat.map((val, index) => {
                return (
                  !val.isDm && (
                    <InviteChatCard
                      key={index}
                      chat={val}
                      onClick={() => handleAddChat(val)}
                      style={{ backgroundColor: chooseChatColor(val.id) }}
                    />
                  )
                );
              })}
            </InviteChatListScroll>
          </InviteFriendsList>
          <StyledButton
            onClick={handleSubmit}
            className={
              invitedChat.length || invitedFriends.length ? "" : "disabled"
            }
            type="submit"
          >
            <h5>Invite</h5>
          </StyledButton>
        </ModalBox>
      </Popup>
    </InviteFriendButtonContainer>
  );
}

export default InviteFriendsButton;
