import { NavBarLink, NavBarItemStyle } from "./NavBarStyle";
import { useState, useEffect } from "react";
import { COLORS } from "../../../colors";
import { useAtom } from "jotai";
import { selectedPageAtom } from "../../../services/store";
import { useLocation } from "react-router";
interface TNavBarItemProps {
  value: string;
  path: string;
}

export function NavBarItem({ value, path  }: TNavBarItemProps) {
  const [selectedPage, setSelectedPage] = useAtom(selectedPageAtom);
  const [color, setColor] = useState(
    selectedPage === path ? COLORS.secondary : COLORS.white
  );
  const location = useLocation();

  useEffect(() => {
    setColor(selectedPage === path ? COLORS.secondary : COLORS.white);
  }, [selectedPage]);

  useEffect(() => {
    setSelectedPage(location.pathname);
  }, [location]);

  const handleClick = () => {
    if (selectedPage != path) {
      setSelectedPage(path);
    }
  };

  return (
    <NavBarItemStyle>
      <NavBarLink onClick={handleClick} color={color} to={path}>
        <h2>{value}</h2>
      </NavBarLink>
    </NavBarItemStyle>
  );
}

export default NavBarItem;
