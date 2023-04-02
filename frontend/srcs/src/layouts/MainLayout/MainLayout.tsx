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
  HeaderContainer,
  NavBarContainer,
  MainContainer,
} from "./MainLayoutStyle";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* desktop */}
      <MediaQuery minWidth={mediaSize.desktop}>
        <MainLayoutStyle>
          <MainLayoutContainer>
            <HeaderContainer>
              <Heptahedre firstText="" secondText="" width="350px" />
              <NavBarContainer>
                <NavBarPage />
              </NavBarContainer>
            </HeaderContainer>
            <MainContainer>{children}</MainContainer>
          </MainLayoutContainer>

          <ChatLayoutContainer>
            <ChatPage />
          </ChatLayoutContainer>
        </MainLayoutStyle>
      </MediaQuery>

      {/* tablet */}
      <MediaQuery maxWidth={mediaSize.tablet}>
        <HeaderContainer>
          <Heptahedre firstText="" secondText="" width="45%" />
          <NavBarContainer>
            <NavBar />
          </NavBarContainer>
        </HeaderContainer>
        <MainContainer>{children}</MainContainer>
      </MediaQuery>
    </>
  );
};

export default MainLayout;
