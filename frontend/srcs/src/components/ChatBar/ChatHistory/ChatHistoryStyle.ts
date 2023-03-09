import styled from "styled-components";
import { COLORS } from "../../../colors";

export const ChatHistoryTopBar = styled.div`
  padding: 8px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ChatHistoryTopBarTitle = styled.h3`
  color: ${COLORS.primary};
`;

export const ChatHistoryBox = styled.div`
  overflow-y: scroll;
  flex-grow: 1;
`;

export const CreateRoomBox = styled.div`
  background-color: ${COLORS.background};
  padding: 8px;
  border-radius: 5px;
`;

export const CreateRoomTitle = styled.h3`
  color: ${COLORS.primary};
`;

export const CreateRoomCheckBox = styled.input``;

export const CreateRoomLabel = styled.label`
  color: ${COLORS.primary};
`;

export const CreateRoomForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const CreateRoomMiddle = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
`