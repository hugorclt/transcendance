import React, { useState } from "react";
import {
  AiOutlineUsergroupAdd,
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";
import { COLORS } from "../../../../colors";
import {
  FriendsTopBarContainer,
  RightFriendsTopBarBox,
} from "./FriendsTopBarStyle";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useAtom } from "jotai";
import { searchUserAtom } from "../../../../services/store";

function FriendsTopBar() {
  const [openInvite, setOpenInvite] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [username, setUsername] = useState("");
  const [searchFriend, setSearchFriends] = useAtom(searchUserAtom);
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = () => {
    setOpenInvite(false);
    axiosPrivate.post("/invitations", { type: "FRIEND", username: username });
    setUsername("");
  };

  const renderTopBar = () => {
    if (openInvite) {
      return (
        <>
          <input
            type="text"
            placeholder="Invite user"
            autoFocus={true}
            onBlur={() => {
              setOpenInvite(false);
              setUsername("");
            }}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") handleSubmit();
            }}
          ></input>
          <AiOutlineClose
            size={24}
            color={COLORS.secondary}
            style={{ cursor: "pointer" }}
            onClick={() => setOpenInvite(false)}
          />
        </>
      );
    } else if (openFilter) {
      return (
        <>
          <input
            type="text"
            placeholder="Search Friends"
            autoFocus={true}
            onBlur={() => {
              setSearchFriends("");
              setOpenFilter(false);
            }}
            onChange={(e) => {
              setSearchFriends(e.target.value);
            }}
          ></input>
          <AiOutlineClose
            size={24}
            color={COLORS.secondary}
            onClick={() => {
              setSearchFriends("");
              setOpenFilter(false);
            }}
            style={{ cursor: "pointer" }}
          />
        </>
      );
    }
    return (
      <>
        <h4>FRIENDS</h4>
        <RightFriendsTopBarBox>
          <AiOutlineUsergroupAdd
            onClick={() => setOpenInvite(true)}
            size={22}
            color={COLORS.secondary}
            style={{ cursor: "pointer" }}
          />
          <AiOutlineSearch
            size={22}
            color={COLORS.secondary}
            onClick={() => setOpenFilter(true)}
            style={{ cursor: "pointer" }}
          />
        </RightFriendsTopBarBox>
      </>
    );
  };

  return <FriendsTopBarContainer>{renderTopBar()}</FriendsTopBarContainer>;
}

export default FriendsTopBar;
