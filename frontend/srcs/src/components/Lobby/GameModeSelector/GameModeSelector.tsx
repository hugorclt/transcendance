import React, { useState } from "react";
import GameModeCard from "./GameModeCard/GameModeCard";
import { useLobbyContext } from "../../../views/LobbyPage/LobbyContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { useGlobal } from "../../../services/Global/GlobalProvider";
import {
  GameModeButton,
  GameModeButtonBody,
  GameModeCardsBody,
  GameModeContainer,
  GameModeContainerMobile,
  GameModeHero,
} from "./GamemodeSelectorStyle";
import { useAtom } from "jotai";
import { lobbyAtom } from "../../../services/store";
import HeptaButton from "../../common/HeptaButton/HeptaButton";
import { COLORS } from "../../../colors";
import MediaQuery from "react-responsive";
import { mediaSize } from "../../../mediaSize";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { ButtonNoStyle } from "../../common/commonStyle";

const dataGameMode = [
  { name: "Classic", description: "Le Pong originel, berceau du gaming" },
  {
    name: "Champions",
    description: "Pong comme vous ne l'aviez jamais imagine",
  },
];

function GameModeSelector() {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const axiosPrivate = useAxiosPrivate();
  const [errMsg, setErrMsg] = useState<string>("");
  const {
    onModeSelected,
    selectedMode,
    players,
    setSelectedMode,
    setOnModeSelected,
    setPlayers,
  } = useLobbyContext();
  const { status, setStatus } = useGlobal();
  const [slider, setSlider] = useState(0);

  const createLobby = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosPrivate
      .post("http://localhost:3000/lobbies", {
        nbPlayers: players,
        mode: selectedMode.toLocaleUpperCase(),
      })
      .then((response: AxiosResponse) => {
        console.log(JSON.stringify(response.data));
        setLobby({
          id: response.data.id,
          ownerId: response.data.ownerId,
          nbPlayers: +response.data.nbPlayers,
          mode: response.data.mode,
          members: response.data.members,
        });
        setSelectedMode("");
        setOnModeSelected(false);
        setPlayers(0);
        setStatus("LOBBY");
      })
      .catch((error: AxiosError) => {
        if (error.response?.data) {
          setErrMsg(JSON.stringify(error.response.data?.message));
        }
      });
  };

  function renderButtonText() {
    if (selectedMode) {
      return selectedMode + (players == 2 ? " 1v1" : " 2v2");
    }
    return "PLAY";
  }

  return (
    <>
      {/* desktop - tabel */}
      <MediaQuery minWidth={mediaSize.mobile + 1}>
        <GameModeContainer>
          <GameModeCardsBody>
            <GameModeCard
              mode="Classic"
              description="Le Pong originel, berceau du gaming"
            />
            <GameModeCard
              mode="Champions"
              description="Pong comme vous ne l'aviez jamais imagine"
            />
          </GameModeCardsBody>
          <GameModeButtonBody>
            <HeptaButton
              width={170}
              height={100}
              onClick={createLobby}
              text={renderButtonText()}
              textSize={"1em"}
              color={selectedMode ? COLORS.secondary : COLORS.grey}
            />
            {errMsg && <p className="text-red-500">{errMsg}</p>}
          </GameModeButtonBody>
        </GameModeContainer>
      </MediaQuery>

      {/* mobile */}
      <MediaQuery maxWidth={mediaSize.mobile}>
        <GameModeContainerMobile>
          <GameModeHero>
            <ButtonNoStyle
              onClick={() => setSlider((prev) => (prev == 0 ? 1 : 0))}>
              <MdKeyboardArrowLeft size={32} color={COLORS.primary} />
            </ButtonNoStyle>
            <GameModeCard
              mode={dataGameMode[slider].name}
              description={dataGameMode[slider].description}
            />
            <ButtonNoStyle
              onClick={() => setSlider((prev) => (prev == 0 ? 1 : 0))}>
              <MdKeyboardArrowRight size={32} color={COLORS.primary} />
            </ButtonNoStyle>
          </GameModeHero>
          <GameModeButtonBody>
            <HeptaButton
              width={130}
              height={90}
              onClick={createLobby}
              text={renderButtonText()}
              textSize={"1em"}
              color={selectedMode ? COLORS.secondary : COLORS.grey}
            />
            {errMsg && <p className="text-red-500">{errMsg}</p>}
          </GameModeButtonBody>
        </GameModeContainerMobile>
      </MediaQuery>
    </>
  );
}

export default GameModeSelector;
