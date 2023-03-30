import styled, { keyframes } from "styled-components";
import { COLORS } from "../../../../colors";
import { mediaSize } from "../../../../mediaSize";

export const GameModeCardsContainer = styled.div`
  background-color: ${COLORS.grey};
  border-radius: 5px;
  border: 1px solid ${COLORS.border};
  border-radius: 8px;

  transition: all 0.7s cubic-bezier(0.45, 0, 0.55, 1) 0.1s;

  @media (min-width: ${(mediaSize.mobile + 1).toString() + "px"}) {
    height: 50vh;
    width: 40%;
  }

  @media (max-width: ${mediaSize.mobile.toString() + "px"}) {
    width: 70%;
    height: 50vh;
  }
`;

export const GameModeCardsUpper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.grey};
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
  background-color: ${COLORS.grey};
`;

export const GameModeCardsText = styled.p`
  color: ${COLORS.background};
`;
