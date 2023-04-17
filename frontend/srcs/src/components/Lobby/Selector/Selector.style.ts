import styled from "styled-components";
import { screenSize } from "../../../mediaSize";

export const SelectorContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MapSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PaddleSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PaddleContainer = styled.div`
  display: flex;
  overflow: auto;
  

  @media screen and (min-width: ${screenSize.laptop}) and (max-width: ${screenSize.desktop}) {
    width: calc(100vw - 48px);
  }
  @media screen and (min-width: ${screenSize.desktop}) {
    width: calc(100vw - 310px);
  }
`;

export const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
`;
