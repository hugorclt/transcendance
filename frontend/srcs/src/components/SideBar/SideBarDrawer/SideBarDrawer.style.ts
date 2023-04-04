import styled from "styled-components";
import { COLORS } from "../../../colors";

export const DrawerContainer = styled.div`
  display: flex;
  height: 100%;
  width: 318px;
  transition: all 400ms;
  position: absolute;
  background-color: ${COLORS.background};
  right: -270px;

  &.drawer-open {
    transform: translate(-270px);
    background-color: ${COLORS.red};
  }
`;

export const ButtonSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
`;
