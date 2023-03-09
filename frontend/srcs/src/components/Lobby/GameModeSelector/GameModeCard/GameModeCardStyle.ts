import styled from "styled-components";
import { COLORS } from "../../../../colors";

export const GameModeCardsContainer = styled.div`
  background-color: ${COLORS.primary};
  border-radius: 5px;
  border: 1px solid ${COLORS.border};
  width: 15%;
  height: 50%;
  transition: all;
  transition-duration: 500ms;
  &:hover {
    width: 25%;
    height: 60%;
  }
`;

export const GameModeCardsUpper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.primary};
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
`;

export const GameModeCardsBottom = styled.div`
  width: 100%;
`;

export const GameModeCardsGameTitle = styled.h1`
  color: ${COLORS.background};
`;

export const GameModeCardsText = styled.p`
  color: ${COLORS.background};
`;
