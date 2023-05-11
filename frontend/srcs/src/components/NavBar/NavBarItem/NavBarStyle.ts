import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../../colors";

export const NavBarItemStyle = styled.div`
  margin: 0 24px;
`;

export const NavBarLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  font-size: 1.5rem;
`;

export const NavBarItemText = styled.h2`
  color: ${COLORS.primary};
  :hover {
    color: ${COLORS.secondary};
  }
  &.selected {
    color: ${COLORS.secondary};
  }
`;
