import styled from "styled-components";
import { COLORS } from "../../../../colors";

export const FriendsCardsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

export const LeftFriendsCardsBox = styled.div`
  display: flex;
  align-items: center;
`;

export const MiddleFriendsCardsBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

export const FriendsCardsName = styled.h4`
  color: ${COLORS.primary};
  width: fit-content;
  position: relative;
`;

export const FriendsCardsStatus = styled.p`
  color: ${COLORS.primary};
  opacity: 50%;
  font-weight: bold;
  font-size: 1.10rem;
`;

export const FriendsCardsAvatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 21px;
`;

export const FriendsCardsStatusRound = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  position: absolute;
  top: 0px;
  right: -8px;
`;

export const FriendsPopUpButton = styled.div`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

export const PopUpBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${COLORS.background};
  padding: 4px;
  border-radius: 5px;
  border: 1px solid ${COLORS.border};
`;

export const InsidePopUpButton = styled.button`
  margin: 2px;
  background: none;
  color: ${COLORS.primary};
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  &:hover {
    color: ${COLORS.secondary};
  }
`;
