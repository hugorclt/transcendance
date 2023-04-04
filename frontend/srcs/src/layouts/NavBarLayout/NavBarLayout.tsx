import React from "react";
import Heptahedre from "../../components/common/Heptahedre/Heptahedre";
import {
  ItemsContainer,
  MiddleItemContainer,
} from "./NavBarLayout.style";
import MainButton from "../../components/NavBar/MainButton/MainButton";
import NavBarItem from "../../components/NavBar/NavBarItem/NavBarItem";

function NavBarLayout() {
  return (
    <>
      <ItemsContainer>
        <NavBarItem path="/shop" value={"SHOP"} />
        <NavBarItem path="/leaderboards" value={"RANKING"} />
      </ItemsContainer>

      <MiddleItemContainer>
        <MainButton>
          <h1>PLAY</h1>
        </MainButton>
      </MiddleItemContainer>

      <ItemsContainer>
        <NavBarItem path="/profile" value={"PROFILE"} />
      </ItemsContainer>
    </>
  );
}

export default NavBarLayout;
