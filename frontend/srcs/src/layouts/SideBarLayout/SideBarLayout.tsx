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
      <MediaQuery minWidth={mediaSize.laptop + 1} maxWidth={mediaSize.desktop - 1}>
        <SideBarDrawerContainer>
          <SideBarDrawer />
        </SideBarDrawerContainer>
      </MediaQuery>
      <MediaQuery minWidth={mediaSize.desktop}>
        <SideBarContainer>
          <SideBar />
        </SideBarContainer>
      </MediaQuery>
      <MediaQuery maxWidth={mediaSize.laptop}>
        <SideBarContainer>
          <SideBar />
        </SideBarContainer>
      </MediaQuery>
    </>
  );
}

export default SideBarLayout;
