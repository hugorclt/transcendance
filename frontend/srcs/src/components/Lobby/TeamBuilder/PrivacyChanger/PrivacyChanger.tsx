import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { lobbyAtom, userAtom } from "../../../../services/store";
import SliderMenu from "../../../common/SliderMenu/SliderMenu";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";

function PrivacyChanger() {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [user, setUser] = useAtom(userAtom);
  const [privacy, setPrivacy] = useState(
    lobby.private ? "PRIVATE" : "MATCHMAKING"
  );
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (lobby.private && privacy != "PRIVATE") {
      setPrivacy("PRIVATE");
    } else if (!lobby.private && privacy != "MATCHMAKING") {
      setPrivacy("MATCHMAKING");
    }
  }, [lobby.private]);

  useEffect(() => {
    if (privacy != (lobby.private ? "PRIVATE" : "MATCHMAKING")) {
      axiosPrivate
        .get(`lobbies/${lobby.id}/changePrivacy`)
        .then((response: AxiosResponse) => {
          console.log(
            "changed privacy successfully, ",
            JSON.stringify(response.data)
          );
        })
        .catch((error: AxiosError) => {
          console.log(
            "error changing privacy: ",
            JSON.stringify(error.message)
          );
        });
    }
    if (user.id != lobby.ownerId) {
      setPrivacy(lobby.private ? "PRIVATE" : "MATCHMAKING");
    }
  }, [privacy]);

  return (
    <SliderMenu
      items={["MATCHMAKING", "PRIVATE"]}
      setState={setPrivacy}
      state={privacy}
      flex={"space-between"}
    ></SliderMenu>
  );
}

export default PrivacyChanger;
