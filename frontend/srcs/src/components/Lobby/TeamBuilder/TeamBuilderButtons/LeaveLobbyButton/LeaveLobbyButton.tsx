import { useAtom } from "jotai";
import React from "react";
import {
  lobbyAtom,
  lobbyDefaultValue,
  userAtom,
} from "../../../../../services/store";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import RoundIconButton from "../../../../common/Button/IconButton/RoundIconButton";
import { COLORS } from "../../../../../colors";
import { LeaveLobbyButtonContainer } from "./LeaveLobbyButton.style";
import CancelIcon from "../../../../../assets/icons/CancelIcon";

function LeaveLobbyButton() {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [user, setUser] = useAtom(userAtom);
  const axiosPrivate = useAxiosPrivate();
  const leaveLobby = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosPrivate
      .post("http://localhost:3000/lobbies/leave", {
        userId: user.id,
        lobbyId: lobby.id,
      })
      .then((response: AxiosResponse) => {
        setLobby(lobbyDefaultValue);
      })
      .catch((error: AxiosError) => {
        console.log(JSON.stringify(error?.response?.data));
      });
  };

  return (
    <LeaveLobbyButtonContainer>
      <RoundIconButton
        size={48}
        color={COLORS.secondary}
        Icon={CancelIcon}
        onClick={leaveLobby}
      />
    </LeaveLobbyButtonContainer>
  );
}

export default LeaveLobbyButton;
