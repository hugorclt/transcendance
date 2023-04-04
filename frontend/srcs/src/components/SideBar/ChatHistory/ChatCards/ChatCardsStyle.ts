import styled from "styled-components";
import { COLORS } from "../../../../colors";

export const ChatCardsBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

export const ChatCardsRoundedAvatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 21px;
`;

export const ChatCardsMiddle = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 8px;
`;

export const ChatCardsName = styled.h3`
  color: ${COLORS.primary};
`;

export const ChatCardsLastMessage = styled.h5`
  color: ${COLORS.primary};
  opacity: 50%;
`;

export const ChatCardsEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const RoundNewChat = styled.div`
  width:10px;
  height:10px;
  border-radius: 5px;
  background-color: ${COLORS.orange};
`