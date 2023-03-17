import { useAtom } from "jotai";
import React, { useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Popup from "reactjs-popup";
import { COLORS } from "../../../../colors";
import { friendAtom } from "../../../../services/store";
import { TFriend } from "../../../../services/type";
import InviteFriendCard from "./InviteFriendCard/InviteFriendCard";
import {
  InviteFriendButtonContainer,
  ModalBox,
  StyledButton,
} from "./InviteFriendsButtonStyle";

function InviteFriendsButton() {
  const [open, setOpen] = useState(false);
  const [friendList, setFriendList] = useAtom(friendAtom);

  return (
    <InviteFriendButtonContainer>
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
          <li>
            {friendList.map((val: TFriend) => {
              return <InviteFriendCard key={val.id} friend={val} />;
            })}
          </li>
          <StyledButton type="submit" value="Invite" />
        </ModalBox>
      </Popup>
    </InviteFriendButtonContainer>
  );
}

export default InviteFriendsButton;
