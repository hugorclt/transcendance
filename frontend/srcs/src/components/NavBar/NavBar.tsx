import React, { useEffect } from "react";
import NavBarItem from "./NavBarItem/NavBarItem";
import { NavBarContainer } from "./NavBarStyle";
import { useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { selectedPageAtom } from "../../services/store";

function NavBar() {
  const [selectedPage, setSelectedPage] = useAtom(selectedPageAtom);
  const location = useLocation();

  function handleTabClick(index: number) {
    if (selectedPage != index) {
      setSelectedPage(index);
      console.log("selected index: ", index);
    }
  }

  useEffect(() => {
    if (location.pathname === "/PLAY") {
      setSelectedPage(1);
    } else if (location.pathname === "/SHOP") {
      setSelectedPage(2);
    } else if (location.pathname === "/RANKINGS") {
      setSelectedPage(3);
    } else if (location.pathname === "/PROFILE") {
      setSelectedPage(4);
    } else {
      setSelectedPage(0);
    }
  }, [location]);

  return (
    <NavBarContainer>
      <NavBarItem
        index={1}
        path="/lobby"
        value={"PLAY"}
        onClick={() => handleTabClick(1)}
      />
      <NavBarItem
        index={2}
        path="/shop"
        value={"SHOP"}
        onClick={() => handleTabClick(2)}
      />
      <NavBarItem
        index={3}
        path="/leaderboards"
        value={"RANKING"}
        onClick={() => handleTabClick(3)}
      />
      <NavBarItem
        index={4}
        path="/profile"
        value={"PROFILE"}
        onClick={() => handleTabClick(4)}
      />
    </NavBarContainer>
  );
}

export default NavBar;
