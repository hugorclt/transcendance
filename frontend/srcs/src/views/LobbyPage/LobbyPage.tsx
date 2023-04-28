import React, { useState } from "react";
import TeamBuilderLayout from "../../layouts/LobbyLayout/TeamBuilderLayout/TeamBuilderLayout";
import { useAtom } from "jotai";
import { endGameAtom, lobbyAtom, userAtom } from "../../services/store";
import LobbyCreatorLayout from "../../layouts/LobbyLayout/LobbyCreatorLayout/LobbyCreatorLayout";
import LobbyCreatorProvider from "./LobbyCreatorProvider";
import Selector from "../../components/Lobby/Selector/Selector";
import { TEndGame } from "../../services/type";
import Popup from "reactjs-popup";
import { PopUpBox } from "../../components/SideBar/FriendsList/FriendsCards/FriendsCardsStyle";
import { EndGameStatInfoContainer } from "./LobbyPage.style";

const createModalEnd = () => {
  const [endGameInfo, setEndGameInfo] = useAtom(endGameAtom);
  const [open, setOpen] = useState(true);
  const [user, setUser] = useAtom(userAtom);

  console.log(endGameInfo);

  setUser((prev) => {
    return { ...prev, exp: prev.exp + endGameInfo.xp,};
  });

  if (endGameInfo.winners.length != 0) {
    return (
      <>
        <Popup modal open={open}>
          <PopUpBox>
            <EndGameStatInfoContainer>
              <h3>
                {endGameInfo.winners.includes(user.id)
                  ? "You Won!"
                  : "You loose!"}
              </h3>
              <h3>
                Team 1 {endGameInfo.winnerScore} - {endGameInfo.loserScore} Team
                2
              </h3>
              <h3>
                xp:{endGameInfo.xp} money: {endGameInfo.money}
              </h3>
              <button onClick={() => setOpen(false)}>Continue</button>
            </EndGameStatInfoContainer>
          </PopUpBox>
        </Popup>
      </>
    );
  }
  return <></>;
};

function LobbyPage() {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [user, setUser] = useAtom(userAtom);

  createModalEnd();
  if (lobby.state == "FULL" || lobby.state == "JOINABLE") {
    return <TeamBuilderLayout />;
  } else if (lobby.state == "SELECTION") {
    return <Selector />;
  } else if (lobby.state == "MATCHMAKING") {
    return <h1>MATCHMAKING</h1>;
  } else {
    return (
      <LobbyCreatorProvider>
        <LobbyCreatorLayout />
      </LobbyCreatorProvider>
    );
  }
}

export default LobbyPage;
