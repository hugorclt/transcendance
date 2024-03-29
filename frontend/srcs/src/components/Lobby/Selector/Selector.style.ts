import styled from "styled-components";
import { screenSize } from "../../../mediaSize";

export const SelectorContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 4px;
  box-sizing: border-box;
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

export const SelectItemContainer = styled.div`
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
