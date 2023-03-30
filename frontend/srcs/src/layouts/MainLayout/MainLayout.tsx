import React, { ReactNode } from "react";
import MediaQuery from "react-responsive";
import { Outlet } from "react-router";
import Heptahedre from "../../components/common/Heptahedre/Heptahedre";
import { mediaSize } from "../../mediaSize";
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
      {/* desktop */}
      <MediaQuery minWidth={mediaSize.desktop}>
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
      </MediaQuery>

      {/* tablet */}
      <MediaQuery maxWidth={mediaSize.tablet} minWidth={mediaSize.mobile + 1}>
        <Heptahedre firstText="" secondText="" />
      </MediaQuery>

      {/* mobile */}
      <MediaQuery maxWidth={mediaSize.mobile}>
        <Heptahedre firstText="" secondText="" />
      </MediaQuery>
    </>
  );
};

export default MainLayout;
