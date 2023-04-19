import { ReactNode } from "react";
import ChatProvider from "./ChatProvider";
import FriendProvider from "./FriendProvider";
import LobbyProvider from "./LobbyProvider";
import NotificationsProvider from "./NotificationsProvider";
import UserPreferencesProvider from "./UserPreferencesProvider";
import UserProvider from "./UserProvider";

export const StateProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <UserPreferencesProvider>
        <FriendProvider>
          <LobbyProvider>
            <NotificationsProvider>
              <ChatProvider>{children}</ChatProvider>
            </NotificationsProvider>
          </LobbyProvider>
        </FriendProvider>
      </UserPreferencesProvider>
    </UserProvider>
  );
};
