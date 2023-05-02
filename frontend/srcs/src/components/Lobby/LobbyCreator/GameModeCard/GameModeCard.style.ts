import styled, { keyframes } from "styled-components";
import { COLORS } from "../../../../colors";
import { mediaSize } from "../../../../mediaSize";

export const GameModeCardsContainer = styled.div`
  border-radius: 5px;
  border: 1px solid ${COLORS.border};
  border-radius: 8px;
  position: relative;
  height: 100%;
  min-height: 400px;
  width: 30%;
  min-width: 220px;
  top: 20%;
  margin: 24px;
  transition: all 0.7s cubic-bezier(0.45, 0, 0.55, 1) 0.1s;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  @media (min-width: ${mediaSize.mobile}) {
    height: 50vh;
    width: 40%;
  }

  @media (max-width: ${mediaSize.mobile}) {
    width: 70%;
    height: 50vh;
  }
`;

export const GameModeCardsUpper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  /* background-color: ${COLORS.grey}; */
  width: 100%;
  height: 50%;
`;

export const GameModeCardsTitleBox = styled.p`
  display: flex;
  /* height: 15%; */
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
  padding: 8px;
  border-radius: 8px;
  background-color: ${COLORS.secondary};
  border: 1px solid ${COLORS.border};
  color: ${COLORS.primary};
  font-weight: bold;
`;

export const GameModeCardsBottom = styled.div`
  width: 100%;
  height: 30%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding: 16px;

  h3 {
    margin-bottom: 16px;
  }

  p {
    font-weight: bold;
  }
`;

export const GameModeCardsGameTitle = styled.h1`
  /* background-color: ${COLORS.grey}; */
`;

export const GameModeCardsText = styled.p`
  color: ${COLORS.background};
`;
