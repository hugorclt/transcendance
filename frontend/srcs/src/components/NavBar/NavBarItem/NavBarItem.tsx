import { NavBarItemStyle, NavBarLink } from "../NavBarStyle";
import { useMainContext } from "../../../views/MainPage/MainContext";
import { useState, useEffect } from "react";
import { COLORS } from "../../../colors";
interface TNavBarItemProps {
  value: string;
  index: number;
  path: string;
  onClick?: React.MouseEventHandler;
}

export function NavBarItem({ value, index, path, onClick }: TNavBarItemProps) {
  const { selectedPage } = useMainContext();
  const [color, setColor] = useState(
    selectedPage === index ? COLORS.secondary : COLORS.white
  );

  useEffect(() => {
    setColor(selectedPage === index ? COLORS.secondary : COLORS.white);
  }, [selectedPage]);

  return (
    <NavBarItemStyle>
      <NavBarLink onClick={onClick} color={color} to={path}>
        {value}
      </NavBarLink>
    </NavBarItemStyle>
  );
}

export default NavBarItem;
