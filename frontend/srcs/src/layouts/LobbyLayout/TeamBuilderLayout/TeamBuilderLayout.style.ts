import styled from "styled-components";
import { COLORS } from "../../../colors";
import { screenSize } from "../../../mediaSize";

export const TeamBuilderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  white-space: nowrap;
  flex-direction: column;
  background-color: ${COLORS.background};
`;

export const GameTitleContainer = styled.div`
  background-color: ${COLORS.grey};
  padding-left: 10px;
  @media (max-width: ${screenSize.tablet}) {
    height: 48px;
  }
  @media (${screenSize.tablet} < width < ${screenSize.laptop}) {
    height: 64px;
  }
  @media (min-width: ${screenSize.laptop}) {
    height: 64px;
  }
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  h3 {
    padding: 8px;
  }
  h4 {
    padding: 8px;
    color: ${COLORS.secondary};
  }
`;

export const SliderContainer = styled.div`
  background-color: ${COLORS.darkgrey};
  width: auto;
  @media (max-width: ${screenSize.tablet}) {
    height: 48px;
  }
  @media (${screenSize.tablet} < width < ${screenSize.laptop}) {
    height: 64px;
  }
  @media (min-width: ${screenSize.laptop}) {
    height: 64px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    font-weight: 600;
  }
`;

export const TeamsContainer = styled.div`
  width: auto;
  flex: 1;
  display: flex;
  justify-content: space-around;
  @media (max-width: ${screenSize.laptop}) {
    flex-direction: column;
  }
`;

export const TeamContainer = styled.div`
  background-color: ${COLORS.white};
  @media (max-width: ${screenSize.laptop}) {
    width: 100%;
    height: 25%;
    min-height: 150px;
  }
  @media (min-width: ${screenSize.laptop}) {
    width: 40%;
    min-width: 400px;
    max-width: 600px;
    height: auto;
  }
`;

export const ButtonsContainer = styled.div`
  width: auto;
  height: 10%;
  min-height: 50px;
  background-color: ${COLORS.blue};
`;
