import styled from "styled-components";
import { COLORS } from "../../../colors";

export const ModalBoxCreateRoom = styled.div`
  background-color: ${COLORS.background};
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${COLORS.border};
  width: 256px;
`;

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
  width: 100%;
`;

export const CreateRoomBox = styled.div`
  padding: 8px;
  border-radius: 5px;
`;

export const CreateRoomTitle = styled.h3`
  color: ${COLORS.primary};
`;

export const CreateRoomCheckBox = styled.input``;

export const CreateRoomLabel = styled.label`
  color: ${COLORS.primary};
  padding: 6px;
  margin: 8px;
`;

export const CreateRoomForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

export const CreateRoomButtonBox = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  border: none;
  width: 100%;
  height: 100%;
  background-color: ${COLORS.background};
`;

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
`;

export const CreateRoomScroll = styled.div`
  overflow-y: auto;
  background-color: ${COLORS.darkergrey};
  border-radius: 8px;
  padding: 16px;
  height: 300px;

  h4 {
    padding: 8px;
  }
`;

export const CreateRoomFriendsCardsContainer = styled.div`
  border-radius: 8px;
  padding: 4px;

  p {
    font-size: 0.80rem;
  }
`;

export const CreateRoomFriendsCards = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }
`;
