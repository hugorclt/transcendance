import React, { ChangeEvent, useEffect } from "react";
import NavBarItem from "./NavBarItem/NavBarItem";
import { NavBarContainer, NavBarSelect } from "./NavBarStyle";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { selectedPageAtom } from "../../services/store";
import MediaQuery from "react-responsive";
import { mediaSize } from "../../mediaSize";

function NavBar() {
  const [selectedPage, setSelectedPage] = useAtom(selectedPageAtom);
  const location = useLocation();
  const navigate = useNavigate();

  function handleTabClick(index: number) {
    if (selectedPage != index) {
      setSelectedPage(index);
    }
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(e.target.value);
  };

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
    <>
    {/* desktop - tabel */}
      <MediaQuery minWidth={mediaSize.mobile + 1}>
        <NavBarContainer>
          <NavBarItem
            index={1}
            path="/"
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
      </MediaQuery>

      {/* mobile */}
      <MediaQuery maxWidth={mediaSize.mobile}>
        <NavBarSelect onChange={handleSelect}>
          <option value="/">PLAY</option>
          <option value="/shop">SHOP</option>
          <option value="/leaderboards">RANKING</option>
          <option value="/profile">PROFILE</option>
        </NavBarSelect>
      </MediaQuery>
    </>
  );
}

export default NavBar;
