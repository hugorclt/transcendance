import { ReactNode } from "react";
import ChatProvider from "./ChatProvider";
import FriendProvider from "./FriendProvider";
import UserPreferencesProvider from "./UserPreferencesProvider";
import UserProvider from "./UserProvider";

export const StateProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <UserPreferencesProvider>
        <FriendProvider>
          <ChatProvider>{children}</ChatProvider>
        </FriendProvider>
      </UserPreferencesProvider>
    </UserProvider>
  );
};
