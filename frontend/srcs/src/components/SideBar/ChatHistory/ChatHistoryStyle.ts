import styled from "styled-components";
import { COLORS } from "../../../colors";

export const ModalBoxCreateRoom = styled.div`
  background-color: ${COLORS.background};
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${COLORS.border};
`

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
  overflow-y: auto;
  flex-grow: 1;
`;

export const ModalCreateJoin = styled.div`
  width:100%;
`

export const CreateRoomBox = styled.div`
  background-color: ${COLORS.background};
  width: 200px;
  padding: 8px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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
  align-items: space-between;
`;

export const CreateRoomButtonBox = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  border:none;
  width: 100%;
  height: 100%;
  background-color: ${COLORS.background};
`

export const CreateRoomFriends = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;

  p {
    color: ${COLORS.primary};
  }
  
  h3 {
    color: ${COLORS.primary};
    text-decoration: underline;
  }
`

export const CreateRoomScroll = styled.div`
  overflow-y: auto;
  background-color: ${COLORS.darkergrey};
  border-radius: 8px;
  padding: 16px;
  height: 300px;

  h4 {
    padding: 8px;
  }
`