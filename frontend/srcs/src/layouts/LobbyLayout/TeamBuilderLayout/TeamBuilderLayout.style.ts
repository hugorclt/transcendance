import styled from "styled-components";
import { COLORS } from "../../../colors";
import { mediaSize, screenSize } from "../../../mediaSize";

export const TeamBuilderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  white-space: nowrap;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
`;

export const GameTitleContainer = styled.div`
  width: 100%;
  align-self: flex-start;
  @media (max-width: ${screenSize.tablet}) {
    height: 32px;
  }
  @media (${screenSize.tablet} < width < ${screenSize.laptop}) {
    height: 48px;
  }
  @media (min-width: ${screenSize.laptop}) {
    height: 48px;
  }
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  h3 {
    padding: 4px;
  }
  h4 {
    padding: 4px;
    color: ${COLORS.secondary};
  }
`;

export const SliderContainer = styled.div`
  margin-bottom: 16px;
  width: 100%;
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
  width: 100%;
  flex: 1;
  display: flex;
  @media (min-width: ${screenSize.laptop}) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  @media (max-width: ${screenSize.laptop}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const TeamContainer = styled.div`
  @media (max-width: ${screenSize.laptop}) {
    width: 100%;
    height: 30%;
    min-height: 120px;
    max-height: 600px;
  }
  @media (min-width: ${screenSize.laptop}) {
    width: 40%;
    min-width: 400px;
    max-width: 600px;
    height: 70%;
    min-height: 280px;
    max-height: 600px;
  }
`;

export const ButtonsContainer = styled.div`
  width: auto;
  height: 10%;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
