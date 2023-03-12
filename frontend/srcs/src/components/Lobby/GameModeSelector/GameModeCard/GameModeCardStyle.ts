import styled, { keyframes } from "styled-components";
import { COLORS } from "../../../../colors";

export const GameModeCardsContainer = styled.div`
  background-color: ${COLORS.darkgrey};
  border-radius: 5px;
  border: 1px solid ${COLORS.border};
  width: 15%;
  height: 50%;
  transition: all 0.7s cubic-bezier(0.45, 0, 0.55, 1) 0.1s;
  &:hover {
    width: 25%;
    height: 60%;
  }
`;

export const GameModeCardsUpper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.darkgrey};
  width: 100%;
  height: 75%;
`;

export const GameModeCardsTitleBox = styled.div`
  display: flex;
  height: 15%;
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
`;

export const GameModeCardsMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
`;

export const GameModeCardsButton = styled.button`
  margin: 16px;
  padding: 6px;
  border-radius: 5px;
  display: none;
  transition: all;
  transition-duration: 0.2s;
  ${GameModeCardsContainer}:hover & {
    display: block;
    transition-delay: 0.8s;
  }
`;

export const GameModeCardsBottom = styled.div`
  width: 100%;
`;

export const GameModeCardsGameTitle = styled.h1`
  color: ${COLORS.darkgrey};
`;

export const GameModeCardsText = styled.p`
  color: ${COLORS.background};
`;
