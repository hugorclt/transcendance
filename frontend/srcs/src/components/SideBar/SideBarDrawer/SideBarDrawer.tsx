import React, { useState } from "react";
import SideBar from "../SideBar";
import { ButtonSlider, DrawerContainer } from "./SideBarDrawer.style";

function SideBarDrawer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const animateDrawer = () => {
    return isOpen ? "drawer-open" : "";
  };

  return (
    <DrawerContainer className={animateDrawer()}>
      <ButtonSlider>
        <button onClick={() => setIsOpen(!isOpen)}>CLICK</button>
      </ButtonSlider>
      <SideBar />
    </DrawerContainer>
  );
}

export default SideBarDrawer;
