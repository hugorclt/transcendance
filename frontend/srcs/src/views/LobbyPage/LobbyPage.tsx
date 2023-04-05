import React from "react";
import LobbyLayout from "../../layouts/LobbyLayout/TeamBuilderLayout/TeamBuilderLayout";
import { LobbySocketProvider } from "../../services/Lobby/LobbySocketContext";
import LobbyProvider from "../MainPage/LobbyProvider";
import { useAtom } from "jotai";
import { userAtom } from "../../services/store";
import LobbyCreatorLayout from "../../layouts/LobbyLayout/LobbyCreatorLayout/LobbyCreatorLayout";
import LobbyCreatorProvider from "./LobbyCreatorProvider";

function LobbyPage() {
  const [user, setUser] = useAtom(userAtom);

  return (
    <LobbySocketProvider>
      <LobbyProvider>
        {user.status == "LOBBY" ? (
          <LobbyLayout />
        ) : (
          <LobbyCreatorProvider>
            <LobbyCreatorLayout />
          </LobbyCreatorProvider>
        )}
      </LobbyProvider>
    </LobbySocketProvider>
  );
}

export default LobbyPage;
