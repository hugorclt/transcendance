import React, { ReactNode } from "react";
import MediaQuery from "react-responsive";
import { Outlet } from "react-router";
import Heptahedre from "../../components/common/Heptahedre/Heptahedre";
import NavBar from "../../components/NavBar/NavBar";
import { mediaSize } from "../../mediaSize";
import ChatPage from "../../views/ChatPage/ChatPage";
import NavBarPage from "../../views/NavBarPage/NavBarPage";
import {
  MainLayoutStyle,
  ChatLayoutContainer,
  MainLayoutContainer,
  NavBarLayoutContainer,
  HeaderContainer,
  NavBarContainer,
} from "./MainLayoutStyle";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* desktop */}
      <MediaQuery minWidth={mediaSize.desktop}>
        <MainLayoutStyle>
          <MainLayoutContainer>
            <HeaderContainer>
              <Heptahedre firstText="" secondText="" />
              <NavBarContainer>
                <NavBarPage />
              </NavBarContainer>
            </HeaderContainer>
            {children}
          </MainLayoutContainer>

          <ChatLayoutContainer>
            <ChatPage />
          </ChatLayoutContainer>
        </MainLayoutStyle>
      </MediaQuery>

      {/* tablet */}
      <MediaQuery maxWidth={mediaSize.tablet} minWidth={mediaSize.mobile + 1}>
        <HeaderContainer>
          <Heptahedre firstText="" secondText="" />
          <NavBarContainer>
            <NavBar />
          </NavBarContainer>
        </HeaderContainer>
        {children}
      </MediaQuery>

      {/* mobile */}
      <MediaQuery maxWidth={mediaSize.mobile}>
        <HeaderContainer>
          <Heptahedre firstText="" secondText="" />
          <NavBarContainer>
            <NavBar />
          </NavBarContainer>
        </HeaderContainer>
        {children}
      </MediaQuery>
    </>
  );
};

export default MainLayout;
