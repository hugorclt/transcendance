import React from "react";
import TeamBuilderLayout from "../../layouts/LobbyLayout/TeamBuilderLayout/TeamBuilderLayout";
import { useAtom } from "jotai";
import { userAtom } from "../../services/store";
import LobbyCreatorLayout from "../../layouts/LobbyLayout/LobbyCreatorLayout/LobbyCreatorLayout";
import LobbyCreatorProvider from "./LobbyCreatorProvider";

function LobbyPage() {
  const [user, setUser] = useAtom(userAtom);

  return (
    <>
      {user.status == "LOBBY" ? (
        <TeamBuilderLayout />
      ) : (
        <LobbyCreatorProvider>
          <LobbyCreatorLayout />
        </LobbyCreatorProvider>
      )}
    </>
  );
}

export default LobbyPage;
