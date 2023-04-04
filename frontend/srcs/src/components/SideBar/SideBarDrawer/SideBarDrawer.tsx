import React, { useState } from "react";
import SideBar from "../SideBar";
import { ButtonSlider, DrawerContainer } from "./SideBarDrawer.style";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { COLORS } from "../../../colors";

function SideBarDrawer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const animateDrawer = () => {
    return isOpen ? "drawer-open" : "";
  };

  const animateArrow = () => {
    return isOpen ? "rotate-arrow" : "";
  }
  return (
    <DrawerContainer className={animateDrawer()}>
      <ButtonSlider>
        {/* {isOpen ? <MdKeyboardDoubleArrowRight
          onClick={() => setIsOpen(!isOpen)}
          size={32}
          color={COLORS.secondary}
        />: <MdKeyboardDoubleArrowLeft
          onClick={() => setIsOpen(!isOpen)}
          size={32}
          color={COLORS.secondary}
        /> } */}

        <MdKeyboardDoubleArrowLeft
          className={animateArrow()}
          onClick={() => setIsOpen(!isOpen)}
          size={32}
          color={COLORS.secondary} />
        
      </ButtonSlider>
      <SideBar />
    </DrawerContainer>
  );
}

export default SideBarDrawer;
