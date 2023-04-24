import { ReactNode, useState } from "react";
import ChatProvider from "./ChatProvider";
import FriendProvider from "./FriendProvider";
import LobbyProvider from "./LobbyProvider";
import UserPreferencesProvider from "./UserPreferencesProvider";
import UserProvider from "./UserProvider";

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <UserProvider>
      <UserPreferencesProvider>
        <FriendProvider>
          <LobbyProvider>
            <ChatProvider>
              {children}
            </ChatProvider>
          </LobbyProvider>
        </FriendProvider>
      </UserPreferencesProvider>
    </UserProvider>
  );
};
