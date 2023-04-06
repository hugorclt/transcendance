import styled from "styled-components";
import { COLORS } from "../../../colors";

export const SliderItems = styled.div`
  display: flex;

  button {
    border: none;
    background-color: inherit;
  }

  h4 {
    padding: 8px;
  }
`;

export const SliderBarContainer = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${COLORS.grey};
  box-sizing: border-box;
`;

export const SliderBar = styled.div`
  height: 2px;
  background-color: ${COLORS.secondary};
  position: absolute;
  transition: all 400ms ease-in-out;
  box-sizing: border-box;
`;
