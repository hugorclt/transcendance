import styled from "styled-components";
import { COLORS } from "../../colors";

export const SideBarContainer = styled.div`
  width: 270px;
  flex-shrink: 0;
  height: 100%;
  min-height: 600px;
  background-color: ${COLORS.background};
`;

export const SideBarDrawerContainer = styled.div`
  position: relative;
  width: 48px;
  background-color: ${COLORS.background};
`;
