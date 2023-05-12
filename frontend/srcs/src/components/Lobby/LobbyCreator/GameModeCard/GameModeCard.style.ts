import styled, { keyframes } from "styled-components";
import { COLORS } from "../../../../colors";
import { mediaSize, screenSize } from "../../../../mediaSize";

export const GameModeCardsContainer = styled.div`
  border-radius: 5px;
  border: 1px solid ${COLORS.border};
  border-radius: 8px;
  height: 70%;
  width: 30%;
  min-width: 220px;
  margin: 24px;
  transition: all 0.7s cubic-bezier(0.45, 0, 0.55, 1) 0.1s;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  @media (min-width: ${screenSize.tablet}) {
    width: 40%;
    min-height: 200px;
  }

  @media (max-width: ${screenSize.tablet}) {
    width: 70%;
    min-height: 300px;
  }
`;

export const GameModeCardsUpper = styled.div`
  display: flex;
  align-items: space-between;
  justify-content: center;
  width: 100%;
`;

export const GameModeCardsButton = styled.button`
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${COLORS.secondary};
  border: 1px solid ${COLORS.border};
  color: ${COLORS.primary};
  font-weight: bold;
`;

export const GameModeCardsBottom = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 16px;

  h3 {
    margin-bottom: 16px;
  }

  p {
    font-weight: bold;
  }
`;

