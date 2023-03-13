import styled from "styled-components";
import { COLORS } from "../../../../../colors";

export const UserChatManagerBox = styled.div`
  display: flex;
  margin: 8px;
  justify-content: space-between;
`;

export const ChatManagerUserName = styled.h4`
  color: ${COLORS.primary};
`;

export const ChatManagerNameStatus = styled.div`
  font-weight: bold;
  color: ${COLORS.primary};
  width: fit-content;
  position: relative;
  margin-bottom: 4px;
  white-space: nowrap;
`;

export const LeftSideChatCardsRightBox = styled.div`
  display:flex;
`