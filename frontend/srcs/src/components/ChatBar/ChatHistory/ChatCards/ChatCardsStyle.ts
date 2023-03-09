import styled from "styled-components";
import { COLORS } from "../../../../colors";

export const ChatCardsBox = styled.div`
  display: flex;
  display: flex-start;
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
`
