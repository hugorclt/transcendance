import React from "react";
import MediaQuery from "react-responsive";
import { mediaSize } from "../../mediaSize";
import SideBar from "../../components/SideBar/SideBar";
import SideBarDrawer from "../../components/SideBar/SideBarDrawer/SideBarDrawer";
import {
  SideBarContainer,
  SideBarDrawerContainer,
} from "./SideBarLayout.style";

function SideBarLayout() {
  return (
    <>
      <MediaQuery maxWidth={mediaSize.desktop - 1}>
        <SideBarDrawerContainer>
          <SideBarDrawer />
        </SideBarDrawerContainer>
      </MediaQuery>
      <MediaQuery minWidth={mediaSize.desktop}>
        <SideBarContainer>
          <SideBar />
        </SideBarContainer>
      </MediaQuery>
    </>
  );
}

export default SideBarLayout;
