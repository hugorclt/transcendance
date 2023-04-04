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
import { AxiosError, AxiosResponse } from "axios";
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

  const renderTopBar = () => {
    if (openInvite) {
      return (
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
            onChange={(e) => setSearchFriends(e.target.value)}></input>
          <AiOutlineClose
            size={24}
            color={COLORS.secondary}
            onClick={() => {
              setSearchFriends("");
              setOpenFilter(false);
            }}
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
          />
          <AiOutlineSearch
            size={22}
            color={COLORS.secondary}
            onClick={() => setOpenFilter(true)}
          />
        </RightFriendsTopBarBox>
      </>
    );
  };

  return <FriendsTopBarContainer>{renderTopBar()}</FriendsTopBarContainer>;
}

export default FriendsTopBar;
