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
  }

  .rotate-arrow {
    transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
  }

  .arrow {
    transition: all 400ms ease-in;
  }
`;

export const ButtonSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
`;
