import React from "react";
import ChatPage from "../../views/ChatPage/ChatPage";
import {
  MainLayoutStyle,
  ChatLayoutContainer,
  MainLayoutContainer,
} from "./MainLayoutStyle";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainLayoutStyle>
      <MainLayoutContainer>{children}</MainLayoutContainer>

      <ChatLayoutContainer>
        <ChatPage />
      </ChatLayoutContainer>
    </MainLayoutStyle>
  );
};

export default MainLayout;
