import React from "react";
import { Outlet } from "react-router-dom";
import ChatPage from "../../views/ChatPage/ChatPage";
import NavBarPage from "../../views/NavBarPage/NavBarPage";
import {
  MainLayoutStyle,
  ChatLayoutContainer,
  MainLayoutContainer,
  NavBarLayoutContainer,
} from "./MainLayoutStyle";

const MainLayout = () => {
  return (
    <MainLayoutStyle>
      <MainLayoutContainer>
        <NavBarLayoutContainer>
          <NavBarPage />
        </NavBarLayoutContainer>
        <Outlet />
      </MainLayoutContainer>

      <ChatLayoutContainer>
        <ChatPage />
      </ChatLayoutContainer>
    </MainLayoutStyle>
  );
};

export default MainLayout;
