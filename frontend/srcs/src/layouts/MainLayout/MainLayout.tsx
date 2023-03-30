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
  HeptaHeaderContainer,
  NavBarContainer,
} from "./MainLayoutStyle";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* desktop */}
      <MediaQuery minWidth={mediaSize.desktop}>
        <MainLayoutStyle>
          <MainLayoutContainer>
            <HeptaHeaderContainer>
              <Heptahedre firstText="" secondText="" />
              <NavBarContainer>
                <NavBarPage />
              </NavBarContainer>
            </HeptaHeaderContainer>
            {children}
          </MainLayoutContainer>

          <ChatLayoutContainer>
            <ChatPage />
          </ChatLayoutContainer>
        </MainLayoutStyle>
      </MediaQuery>

      {/* tablet */}
      <MediaQuery maxWidth={mediaSize.tablet} minWidth={mediaSize.mobile + 1}>
        <HeptaHeaderContainer>
          <Heptahedre firstText="" secondText="" />
          <NavBarContainer>
            <NavBar />
          </NavBarContainer>
        </HeptaHeaderContainer>
        {children}
      </MediaQuery>

      {/* mobile */}
      <MediaQuery maxWidth={mediaSize.mobile}>
        <HeptaHeaderContainer>
          <Heptahedre firstText="" secondText="" />
          <NavBarContainer>
            <NavBar />
          </NavBarContainer>
        </HeptaHeaderContainer>
        {children}
      </MediaQuery>
    </>
  );
};

export default MainLayout;
