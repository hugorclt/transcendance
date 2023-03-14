import { ReactNode } from "react";
import FriendProvider from "./FriendProvider";
import UserProvider from "./UserProvider";

export const StateProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <FriendProvider>{children}</FriendProvider>
    </UserProvider>
  );
};
