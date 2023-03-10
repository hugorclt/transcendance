import styled from "styled-components";
import { COLORS } from "../../colors";

export const NavBarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const NavBarItemStyle = styled.div`
  height: 100%;
  flex: 0 0 25%;
  background-color: #080808;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavBarItemText = styled.h3`
  color: ${COLORS.primary};
  font-size: 2vw;
`;
