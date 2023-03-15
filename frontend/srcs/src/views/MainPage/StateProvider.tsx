import { ReactNode } from "react";
import ChatProvider from "./ChatProvider";
import FriendProvider from "./FriendProvider";
import UserProvider from "./UserProvider";

export const StateProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <FriendProvider>
        <ChatProvider>
          {children}
        </ChatProvider>
      </FriendProvider>
    </UserProvider>
  );
};
