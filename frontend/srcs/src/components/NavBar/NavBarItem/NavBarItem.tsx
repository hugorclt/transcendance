import { NavBarItemStyle, NavBarItemText } from "../NavBarStyle";

interface TNavBarItemProps {
  value: string;
  color: string;
  onClick?: React.MouseEventHandler;
}

export function NavBarItem({ value, color, onClick }: TNavBarItemProps) {
  return (
    <NavBarItemStyle onClick={onClick}>
      <NavBarItemText font-color={color}>{value}</NavBarItemText>
    </NavBarItemStyle>
  );
}

export default NavBarItem;
