import styled from "styled-components";
import { COLORS } from "../../../colors";

export const ChatTabContainer = styled.div`
  width: 370px;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${COLORS.secondary};
  opacity: 80%;
`;

export const ChatForm = styled.form`
  width: 95%;
  margin: 8px;
  border-radius: 5px;
`;

export const ChatMessageContainer = styled.form`
  background-color: ${COLORS.secondary};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  overflow-y: scroll;
  height: 100%;
`;

export const ChatInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 5px;
  padding: 8px;
  color: ${COLORS.primary};
  background-color: ${COLORS.background};
`;

export const MessageLine = styled.div`
  width: 70%;
  display: flex;
  background-color: ${COLORS.secondary};
  padding: 4px;
`;

export const MessageBox = styled.div`
  width: 100%;
  background-color: ${COLORS.background};
  border-radius: 5px;
  padding: 8px;
`;

export const MessageContent = styled.p`
  color: ${COLORS.primary};
  word-wrap: break-word;
`;

export const ChatTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLORS.secondary};
  padding: 8px;
`

export const ChatMiddle = styled.div`
  display:flex;
  justify-content: start;
  align-items: center;
  background-color: ${COLORS.secondary};
`

export const ChatIcon = styled.img`
  width:42px;
  height:42px;
  border-radius:21px;
  margin-right:8px;
`

export const ChatTitle = styled.h3`
  color: ${COLORS.background};
  background-color: ${COLORS.secondary};
  margin-right:4px;
`
