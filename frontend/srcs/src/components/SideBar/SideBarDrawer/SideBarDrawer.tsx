import React, { useState } from "react";
import SideBar from "../SideBar";
import { ButtonSlider, DrawerContainer } from "./SideBarDrawer.style";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { COLORS } from "../../../colors";

function SideBarDrawer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const animateDrawer = () => {
    return isOpen ? "drawer-open" : "";
  };

  const animateArrow = () => {
    return isOpen ? "arrow rotate-arrow" : "arrow";
  };
  return (
    <DrawerContainer className={animateDrawer()}>
      <ButtonSlider>
        <MdKeyboardDoubleArrowLeft
          className={animateArrow()}
          onClick={() => setIsOpen(!isOpen)}
          cursor={"pointer"}
          size={32}
          color={COLORS.secondary}
        />
      </ButtonSlider>
      <SideBar />
    </DrawerContainer>
  );
}

export default SideBarDrawer;
