import React from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useAtom } from "jotai";
import { lobbyAtom, userAtom } from "../../../../../services/store";
import { AxiosError, AxiosResponse } from "axios";
import HeptaButton from "../../../../common/Button/HeptaButton/HeptaButton";
import MediaQuery from "react-responsive";
import { mediaSize } from "../../../../../mediaSize";

function ReadyButton() {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [user, setUser] = useAtom(userAtom);
  const axiosPrivate = useAxiosPrivate();
  const changeReady = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosPrivate
      .get(`lobbies/${lobby.id}/changeReady`)
      .then((response: AxiosResponse) => {})
      .catch((error: AxiosError) => {
        console.log(
          "error changing ready status: ",
          JSON.stringify(error.message)
        );
      });
  };
  return (
    <>
      <MediaQuery maxWidth={mediaSize.tablet - 1}>
        <HeptaButton
          onClick={changeReady}
          width={120}
          height={60}
          text={"READY"}
        />
      </MediaQuery>
      <MediaQuery minWidth={mediaSize.tablet} maxWidth={mediaSize.laptop - 1}>
        <HeptaButton
          onClick={changeReady}
          width={150}
          height={70}
          text={"READY"}
        />
      </MediaQuery>
      <MediaQuery minWidth={mediaSize.laptop}>
        <HeptaButton
          onClick={changeReady}
          width={170}
          height={80}
          text={"READY"}
        />
      </MediaQuery>
    </>
  );
}

export default ReadyButton;
