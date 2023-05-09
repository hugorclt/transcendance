import React, { ReactNode } from "react";
import MediaQuery from "react-responsive";
import { mediaSize } from "../../mediaSize";
import NavBarPage from "../../views/NavBarPage/NavBarPage";
import {
  MainLayoutContainer,
  NavBarContainer,
  MainContainer,
  PageContainer,
  NavBarMobileContainer,
  SideBarMobileContainer,
} from "./MainLayout.style";
import SideBarPage from "../../views/SideBarPage/SideBarPage";
import Heptahedre from "../../components/common/Heptahedre/Heptahedre";
import NavBar from "../../components/NavBar/NavBar";
import { useAtom } from "jotai";
import SideBar from "../../components/SideBar/SideBar";
import { sideBarAtom } from "../../services/store";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [openSideBar, setOpenSideBar] = useAtom(sideBarAtom);
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

          <SideBarPage />
        </MainLayoutContainer>
      </MediaQuery>

      {/* tablet and mobile */}
      <MediaQuery maxWidth={mediaSize.laptop}>
        <MainLayoutContainer>
          <NavBarMobileContainer>
            <NavBar />
          </NavBarMobileContainer>
          <PageContainer>{children}</PageContainer>

          {openSideBar && (
            <SideBarMobileContainer>
              <SideBarPage />
            </SideBarMobileContainer>
          )}
        </MainLayoutContainer>
      </MediaQuery>
    </>
  );
};

export default MainLayout;
