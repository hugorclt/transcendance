import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { lobbyAtom } from "../../../../services/store";
import { ChangeTeamButtonContainer } from "./ChangeTeamButton.style";

function ChangeTeamButton() {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const axiosPrivate = useAxiosPrivate();

  const changeTeam = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosPrivate
      .get(`http://localhost:3000/lobbies/${lobby.id}/changeTeam`)
      .then((response: AxiosResponse) => {
        console.log("success changing team: ", JSON.stringify(response.data));
      })
      .catch((error: AxiosError) => {
        console.log(JSON.stringify(error?.response?.data));
      });
  };

  return (
    <ChangeTeamButtonContainer onClick={changeTeam}></ChangeTeamButtonContainer>
  );
}

export default ChangeTeamButton;
