import styled from "styled-components";
import { COLORS } from "../../../colors";

export const ChatBody = styled.div`
  display:flex;
  width: 370px;
  height: 450px;
`

export const ChatContainer = styled.div`
  position: absolute;
  bottom: 0px;
  right: 270px;
`;

export const ChatTabContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${COLORS.background};
`;

export const ChatForm = styled.form`
  width: 95%;
  margin: 8px;
  display: flex;
  justify-content: center;
  border-radius: 5px;

  p {
    color: ${COLORS.primary}
  }
`;

export const ChatMessageContainer = styled.form`
  background-color: ${COLORS.background};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  overflow-y: auto;
  height: 100%;
`;

export const ChatInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 5px;
  padding: 8px;
  color: ${COLORS.primary};
  background-color: ${COLORS.border};
`;

export const MessageLine = styled.div`
  width: 100%;
  display: flex;
  background-color: ${COLORS.background};
  padding: 4px;
`;

export const MessageBox = styled.div`
  width: 70%;
  box-sizing: border-box;
  background-color: ${COLORS.secondary};
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
  background-color: ${COLORS.background};
  padding: 8px;
`

export const ChatMiddle = styled.div`
  display:flex;
  justify-content: start;
  align-items: center;
  background-color: ${COLORS.background};
`

export const ChatIcon = styled.img`
  width:42px;
  height:42px;
  border-radius:21px;
  margin-right:8px;
  margin: 0px 8px;
`

export const ChatTitle = styled.h3`
  color: ${COLORS.primary};
  background-color: ${COLORS.background};
  margin-right:4px;
`