import React from "react";
import ChatPage from "../../views/ChatPage/ChatPage";
import NavBarPage from "../../views/NavBarPage/NavBarPage";
import {
  MainLayoutStyle,
  ChatLayoutContainer,
  MainLayoutContainer,
  NavBarLayoutContainer,
} from "./MainLayoutStyle";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainLayoutStyle>
      <MainLayoutContainer>
        <NavBarLayoutContainer>
          <NavBarPage />
        </NavBarLayoutContainer>
        {children}
      </MainLayoutContainer>

      <ChatLayoutContainer>
        <ChatPage />
      </ChatLayoutContainer>
    </MainLayoutStyle>
  );
};

export default MainLayout;
