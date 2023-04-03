import React, { ReactNode } from "react";
import MediaQuery from "react-responsive";
import { mediaSize } from "../../mediaSize";
// import ChatPage from "../../views/ChatPage/ChatPage";
import NavBarPage from "../../views/NavBarPage/NavBarPage";
import {
  MainLayoutContainer,
  NavBarContainer,
  MainContainer,
  SideBarContainer,
  PageContainer,
} from "./MainLayout.style";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* laptop and desktop */}
      <MediaQuery minWidth={mediaSize.laptop + 1}>
        <MainLayoutContainer>
          <MainContainer>
            <NavBarContainer>
              <NavBarPage />
            </NavBarContainer>
            <PageContainer>{children}</PageContainer>
          </MainContainer>

          {/* A remplacer par query sur desktop / laptop */}
          <SideBarContainer>
            <h1>SIDEBAR</h1>
            {/* <SideBarPage /> */}
          </SideBarContainer>
        </MainLayoutContainer>
      </MediaQuery>

      {/* tablet and mobile */}
      <MediaQuery maxWidth={mediaSize.laptop}>
        <MainLayoutContainer>
          <NavBarContainer>
            <h1>NAVBAR</h1>
          </NavBarContainer>
          <PageContainer>{children}</PageContainer>
        </MainLayoutContainer>
      </MediaQuery>
    </>
  );
};

export default MainLayout;
