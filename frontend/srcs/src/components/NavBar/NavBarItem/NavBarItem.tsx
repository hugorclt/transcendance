import { NavBarLink, NavBarItemStyle, NavBarItemText } from "./NavBarStyle";
import { useLocation } from "react-router";
interface TNavBarItemProps {
  central?: boolean;
  value: string;
  path: string;
}

export function NavBarItem({ value, path, central }: TNavBarItemProps) {
  const location = useLocation();

  return (
    <NavBarItemStyle>
      <NavBarLink to={path}>
        {central ? (
          <h1>{value}</h1>
        ) : (
          <NavBarItemText
            className={location.pathname == path ? "selected" : ""}
          >
            {value}
          </NavBarItemText>
        )}
      </NavBarLink>
    </NavBarItemStyle>
  );
}

export default NavBarItem;
