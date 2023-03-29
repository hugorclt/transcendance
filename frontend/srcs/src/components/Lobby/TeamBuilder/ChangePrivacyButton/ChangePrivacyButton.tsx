import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { lobbyAtom } from "../../../../services/store";

function ChangePrivacyButton() {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const axiosPrivate = useAxiosPrivate();

  const changePrivacy = (e: React.SyntheticEvent) => {
    e.preventDefault();

    axiosPrivate
      .get(`lobbies/${lobby.id}/changePrivacy`)
      .then((response: AxiosResponse) => {
        console.log("changed privacy successfully");
      })
      .catch((error: AxiosError) => {
        console.log("error changing privacy: ", JSON.stringify(error.message));
      });
  };

  return <button onClick={changePrivacy}>change privacy</button>;
}

export default ChangePrivacyButton;
