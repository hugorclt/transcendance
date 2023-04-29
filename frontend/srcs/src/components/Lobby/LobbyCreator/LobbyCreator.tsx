import React, { useState } from "react";
import GameModeCard from "./GameModeCard/GameModeCard";
import { AxiosError, AxiosResponse } from "axios";
import {
  GameModeButtonBody,
  GameModeCardsBody,
  GameModeContainer,
  GameModeContainerMobile,
  GameModeHero,
  LobbyFlex,
  MoneyContainer,
  XpContainer,
} from "./LobbyCreator.style";
import { useAtom } from "jotai";
import MediaQuery from "react-responsive";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { ButtonNoStyle } from "./LobbyCreator.style";
import { endGameAtom, lobbyAtom, userAtom } from "../../../services/store";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLobbyCreatorContext } from "../../../views/LobbyPage/LobbyCreatorProvider";
import HeptaButton from "../../common/Button/HeptaButton/HeptaButton";
import { COLORS } from "../../../colors";
import { mediaSize } from "../../../mediaSize";
import Popup from "reactjs-popup";
import { PopUpBox } from "../../SideBar/FriendsList/FriendsCards/FriendsCardsStyle";
import { EndGameStatInfoContainer } from "../../../views/LobbyPage/LobbyPage.style";
import { TbCurrencyShekel } from "react-icons/tb";
import { FaLevelUpAlt } from "react-icons/fa";

const dataGameMode = [
  {
    name: "Classic",
    description: "Le Pong originel, berceau du gaming",
    img: "",
  },

  {
    name: "Champions",
    description: "Pong comme vous ne l'aviez jamais imagine",
    img: "",
  },
];

const createModalEnd = () => {
  const [endGameInfo, setEndGameInfo] = useAtom(endGameAtom);
  const [open, setOpen] = useState(true);
  const [user, setUser] = useAtom(userAtom);

  if (endGameInfo.winners.length != 0) {
    const clickFinish = () => {
      setOpen(false);
      setEndGameInfo({
        winnerScore: 0,
        winners: [],
        loserScore: 0,
        losers: [],
        xp: 0,
        money: 0,
      });
    };

    return (
      <>
        <Popup modal open={open}>
          <PopUpBox>
            <EndGameStatInfoContainer>
              <h3 className="game-winner">
                {endGameInfo.winners.includes(user.id)
                  ? "You Won!"
                  : "You loose!"}
              </h3>
              <h3>
                Team1{" "}
                <span>
                  {endGameInfo.winnerScore} - {endGameInfo.loserScore}
                </span>{" "}
                Team2
              </h3>
              <LobbyFlex>
                <XpContainer>
                  <FaLevelUpAlt size={30} color={COLORS.secondary} />
                  <h3>+{endGameInfo.xp}</h3>
                </XpContainer>
                <MoneyContainer>
                  <TbCurrencyShekel size={42} color={COLORS.secondary} />
                  <h3>+{endGameInfo.money}</h3>
                </MoneyContainer>
              </LobbyFlex>
              <button onClick={clickFinish}>Continue</button>
            </EndGameStatInfoContainer>
          </PopUpBox>
        </Popup>
      </>
    );
  }
  return <></>;
};

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

  const createLobby = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosPrivate
      .post("http://localhost:3000/lobbies", {
        nbPlayers: players,
        mode: selectedMode.toLocaleUpperCase(),
      })
      .then((response: AxiosResponse) => {
        setLobby((...prev) => ({
          ...prev,
          ...response.data,
          nbPlayers: +response.data.nbPlayers,
        }));
        setSelectedMode("");
        setOnModeSelected(false);
        setPlayers(0);
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
      {createModalEnd()}
      {/* desktop - tabel */}
      <MediaQuery minWidth={mediaSize.tablet + 1}>
        <GameModeContainer>
          <GameModeCardsBody>
            <GameModeCard
              mode="Classic"
              description="Pong Classic is a game mode that recreates the classic arcade game Pong, which was first released in the early 1970s."
              img={""}
            />
            <GameModeCard
              mode="Champions"
              description="Pong Champions is a game mode that takes the classic game of Pong to the next level by giving players the ability to activate special powers during gameplay"
              img={"../../../../public/planet.jpeg"}
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
              img={""}
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

export default LobbyCreator;
