import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../../colors";

export const NavBarItemStyle = styled.div`
  margin: 24px;
`

export const NavBarLink = styled(Link)`
  color: ${(props) => props.color};
  font-weight: bold;
  text-decoration: none;
  font-size: 1.5rem;
  &:hover,
  &:focus {
    color: ${COLORS.primary};
  }
`;

export const NavBarSelect = styled.select`
  border: none;
  background-color: ${COLORS.secondary};
  color: ${COLORS.primary};
  font-size: 2em;
  font-weight: bold;
`;
