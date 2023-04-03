import React from "react";
import Heptahedre from "../../components/common/Heptahedre/Heptahedre";
import {
  ItemsContainer,
  MiddleItemContainer,
  NavBarItem,
} from "./NavBarLayout.style";
import MainButton from "../../components/NavBar/MainButton/MainButton";

function NavBarLayout() {
  return (
    <>
      <ItemsContainer>
        <NavBarItem />
        <NavBarItem />
      </ItemsContainer>

      <MiddleItemContainer>
        <MainButton />
      </MiddleItemContainer>

      <ItemsContainer>
        <NavBarItem />
      </ItemsContainer>
    </>
  );
}

export default NavBarLayout;
