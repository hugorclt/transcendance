import styled from "styled-components";
import { COLORS } from "../../colors";

export const ItemsContainer = styled.div`
  background-color: ${COLORS.orange};
  width: 35%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const MiddleItemContainer = styled.div`
  background-color: ${COLORS.white};
  flex-grow: 1;
`;

export const NavBarItem = styled.div`
  width: 50%;
  margin: 8px;
  height: 100%;
  background-color: ${COLORS.blue};
`;
