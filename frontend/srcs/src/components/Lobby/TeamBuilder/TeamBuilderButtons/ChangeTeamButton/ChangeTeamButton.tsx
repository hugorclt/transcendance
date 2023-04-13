import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { lobbyAtom } from "../../../../../services/store";
import { ChangeTeamButtonContainer } from "./ChangeTeamButton.style";
import RoundIconButton from "../../../../common/Button/IconButton/RoundIconButton";
import SwitchIcon from "../../../../../assets/icons/SwitchIcon";
import MediaQuery from "react-responsive";
import { mediaSize } from "../../../../../mediaSize";

function ChangeTeamButton() {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [disabled, setDisabled] = useState(!lobby.private);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    if (lobby.private) {
      //detect if opponent team is full
      //=> yes
      //setDisabled(true);
      //else
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [lobby.private]);

  const changeTeam = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosPrivate
      .get(`http://localhost:3000/lobbies/${lobby.id}/changeTeam`)
      .then((response: AxiosResponse) => {})
      .catch((error: AxiosError) => {
        console.log(JSON.stringify(error?.response?.data));
      });
  };

  return (
    <ChangeTeamButtonContainer>
      <MediaQuery maxWidth={mediaSize.tablet - 1}>
        <RoundIconButton
          size={24}
          disabled={disabled}
          Icon={SwitchIcon}
          onClick={changeTeam}
        />
      </MediaQuery>
      <MediaQuery minWidth={mediaSize.tablet} maxWidth={mediaSize.laptop - 1}>
        <RoundIconButton
          size={32}
          disabled={disabled}
          Icon={SwitchIcon}
          onClick={changeTeam}
        />
      </MediaQuery>
      <MediaQuery minWidth={mediaSize.laptop}>
        <RoundIconButton
          size={48}
          disabled={disabled}
          rotation="rotate(90deg)"
          Icon={SwitchIcon}
          onClick={changeTeam}
        />
      </MediaQuery>
    </ChangeTeamButtonContainer>
  );
}

export default ChangeTeamButton;
