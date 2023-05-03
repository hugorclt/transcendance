import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useAtom } from "jotai";
import { lobbyAtom, userAtom } from "../../../../../services/store";
import { AxiosError, AxiosResponse } from "axios";
import HeptaButton from "../../../../common/Button/HeptaButton/HeptaButton";
import MediaQuery from "react-responsive";
import { mediaSize } from "../../../../../mediaSize";

function PlayButton() {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [user, setUser] = useAtom(userAtom);
  const [readyToStart, setReadyToStart] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const play = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosPrivate
      .get(`lobbies/${lobby.id}/play`)
      .then((response: AxiosResponse) => {
        setReadyToStart(false);
        //navigate?
      })
      .catch((error: AxiosError) => {
        console.log("error starting game", JSON.stringify(error.message));
      });
  };

  useEffect(() => {
    if (lobby.state === "FULL") {
      const notReady = lobby.members.find((member) => member.ready == false);
      if (!notReady) {
        setReadyToStart(true);
      }
    } else {
      if (readyToStart) {
        setReadyToStart(false);
      }
    }
  }, [lobby, user]);

  return (
    <>
      <MediaQuery maxWidth={mediaSize.tablet - 1}>
        <HeptaButton
          disabled={readyToStart ? false : true}
          onClick={play}
          width={120}
          height={60}
          text={"PLAY"}
        />
      </MediaQuery>
      <MediaQuery minWidth={mediaSize.tablet} maxWidth={mediaSize.laptop - 1}>
        <HeptaButton
          disabled={readyToStart ? false : true}
          onClick={play}
          width={150}
          height={70}
          text={"PLAY"}
        />
      </MediaQuery>
      <MediaQuery minWidth={mediaSize.laptop}>
        <HeptaButton
          disabled={readyToStart ? false : true}
          onClick={play}
          width={170}
          height={80}
          text={"PLAY"}
        />
      </MediaQuery>
    </>
  );
}

export default PlayButton;
