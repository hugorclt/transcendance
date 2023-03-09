import styled from "styled-components";
import { COLORS } from "../../../../colors";

export const FriendsTopBarContainer = styled.div`
  padding-left: 8px;
  padding-top: 8px;
  padding-right: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FriendsTopBarTitle = styled.h3`
  color: ${COLORS.primary};
`;

export const RightFriendsTopBarBox = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin: 0 4px;
  }
`;

export const ModalTitle = styled.h4`
  color: ${COLORS.primary};
`;

export const ModalBox = styled.div`
  background-color: ${COLORS.background};
  padding: 8px;
  border-radius: 5px;
`;

export const AddFriendsForm = styled.form``;

export const AddFriendsInput = styled.input`
  background-color: ${COLORS.background};
  color: ${COLORS.primary};
  border: none;
  padding: 4px;
  margin: 8px;
`;

export const SubmitFriends = styled.input`
  padding: 4px;
  background-color: ${COLORS.secondary};
  color: ${COLORS.primary};
  border: none;
  border-radius: 5px;
`;
