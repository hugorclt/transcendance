import React, { useState } from "react";
import Heptahedre from "../common/Heptahedre/Heptahedre";
import {
  NavBarContainer,
  NavBarSelect,
  NavBarSelectContainer,
} from "./NavBar.style";
import { CiMenuBurger } from "react-icons/ci";
import { COLORS } from "../../colors";
import SideBar from "../SideBar/SideBar";
import { useLocation, useNavigate } from "react-router";
import { useAtom } from "jotai";
import { sideBarAtom } from "../../services/store";

function NavBar() {
  const [sideBar, setSideBar] = useAtom(sideBarAtom);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <NavBarSelectContainer>
        <NavBarSelect defaultValue={location.pathname} onChange={(e) => navigate(e.target.value)}>
          <option value="/">PLAY</option>
          <option value="/shop">SHOP</option>
          <option value="/profile">PROFIL</option>
          <option value="/ranking">RANKING</option>
        </NavBarSelect>
        <NavBarContainer>
          <CiMenuBurger
            onClick={() => setSideBar(true)}
            color={COLORS.primary}
            size={48}
          />
        </NavBarContainer>
      </NavBarSelectContainer>
      <Heptahedre />
    </>
  );
}

export default NavBar;
