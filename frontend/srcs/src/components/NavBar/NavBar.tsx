import React from "react";
import { COLORS } from "../../colors";
import { useNavBarContext } from "../../views/NavBarPage/NavBarContext";
import NavBarItem from "./NavBarItem/NavBarItem";
import { NavBarContainer } from "./NavBarStyle";

function NavBar() {
  const { selectedTab, setSelectedTab } = useNavBarContext();

  function handleTabClick(index: number) {
    setSelectedTab(index);
    console.log("selected index: ", index);
  }

  return (
    <NavBarContainer>
      <NavBarItem color={selectedTab == 1 ? COLORS.secondary : COLORS.white } value={"PLAY"} onClick={() => handleTabClick(1)} />
      <NavBarItem color={selectedTab == 2 ? COLORS.secondary : COLORS.white } value={"SHOP"} onClick={() => handleTabClick(2)} />
      <NavBarItem color={selectedTab == 3 ? COLORS.secondary : COLORS.white } value={"RANKING"} onClick={() => handleTabClick(3)} />
      <NavBarItem color={selectedTab == 4 ? COLORS.secondary : COLORS.white } value={"PROFILE"} onClick={() => handleTabClick(4)} />
    </NavBarContainer>
  );
}

export default NavBar;
