import styled from "styled-components";
import { COLORS } from "../../../colors";

export const ModalBoxCreateRoom = styled.div`
  background-color: ${COLORS.background};
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${COLORS.border};
  width: 512px;
  height: 256px;
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
  overflow-y: scroll;
  flex-grow: 1;
`;

export const ModalCreateJoin = styled.div`
  width:100%;
  display:flex;
  justify-content: space-around;
`

export const CreateRoomBox = styled.div`
  background-color: ${COLORS.background};
  padding: 8px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
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
  height:100%;
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
  overflow-y: scroll;
`