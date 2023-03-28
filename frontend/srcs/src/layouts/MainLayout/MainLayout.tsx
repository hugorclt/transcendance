import React, { ReactNode } from "react";
import { Outlet } from "react-router";
import ChatPage from "../../views/ChatPage/ChatPage";
import NavBarPage from "../../views/NavBarPage/NavBarPage";
import {
  MainLayoutStyle,
  ChatLayoutContainer,
  MainLayoutContainer,
  NavBarLayoutContainer,
} from "./MainLayoutStyle";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
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
    </>
  );
};

export default MainLayout;
