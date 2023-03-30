import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../colors";

export const NavBarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavBarItemStyle = styled.div`
  margin: 16px;
`;

export const NavBarLink = styled(Link)`
  color: ${(props) => props.color};
  font-weight: bold;
  font-size: 1.5em;
  text-decoration: none;
  &:hover,
  &:focus {
    color: ${COLORS.background};
  }
`;

export const NavBarSelect = styled.select`
  border: none;
  background-color: ${COLORS.secondary};
  color: ${COLORS.primary};
  font-size: 2em;
  font-weight: bold;
`
