import React, { useState } from "react";
import GameModeCard from "./GameModeCard/GameModeCard";
import { AxiosError, AxiosResponse } from "axios";
import {
  GameModeButtonBody,
  GameModeCardsBody,
  GameModeContainer,
  GameModeContainerMobile,
  GameModeHero,
} from "./LobbyCreator.style";
import { useAtom } from "jotai";
import MediaQuery from "react-responsive";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { ButtonNoStyle } from "./LobbyCreator.style";
import { lobbyAtom, userAtom } from "../../../services/store";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLobbyCreatorContext } from "../../../views/LobbyPage/LobbyCreatorProvider";
import HeptaButton from "../../common/Button/HeptaButton/HeptaButton";
import { COLORS } from "../../../colors";
import { mediaSize } from "../../../mediaSize";

const dataGameMode = [
  { name: "Classic", description: "Le Pong originel, berceau du gaming" },
  {
    name: "Champions",
    description: "Pong comme vous ne l'aviez jamais imagine",
  },
];

function LobbyCreator() {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const axiosPrivate = useAxiosPrivate();
  const [errMsg, setErrMsg] = useState<string>("");
  const {
    onModeSelected,
    setOnModeSelected,
    players,
    setPlayers,
    selectedMode,
    setSelectedMode,
  } = useLobbyCreatorContext();
  const [slider, setSlider] = useState(0);
  const [user, setUser] = useAtom(userAtom);

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
          state: response.data.state,
          members: response.data.members,
        });
        setSelectedMode("");
        setOnModeSelected(false);
        setPlayers(0);
        setUser((prev) => ({ ...prev, status: "LOBBY" }));
      })
      .catch((error: AxiosError) => {
        if (error.response?.data) {
          setErrMsg(JSON.stringify(error.message));
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
      <MediaQuery minWidth={mediaSize.tablet + 1}>
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
              onClick={() => setSlider((prev) => (prev == 0 ? 1 : 0))}
            >
              <MdKeyboardArrowLeft size={32} color={COLORS.primary} />
            </ButtonNoStyle>
            <GameModeCard
              mode={dataGameMode[slider].name}
              description={dataGameMode[slider].description}
            />
            <ButtonNoStyle
              onClick={() => setSlider((prev) => (prev == 0 ? 1 : 0))}
            >
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

export default LobbyCreator;
