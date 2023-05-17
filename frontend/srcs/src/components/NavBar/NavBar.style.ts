import styled from "styled-components";
import { screenSize } from "../../mediaSize";
import { COLORS } from "../../colors";

export const NavBarSelectContainer = styled.div`
  position: absolute;
  z-index: 20;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const NavBarSelect = styled.select`
  background-color: ${COLORS.secondary};
  border: none;
  color: white;
  font-weight: bold;
  font-size: 2em;
`;

export const NavBarContainer = styled.div`
  padding: 32px;
  display: flex;
  align-items: center;
`;
