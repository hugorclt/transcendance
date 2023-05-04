import styled from "styled-components";
import { COLORS } from "../../../../../colors";

export const InviteFriendButtonContainer = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${COLORS.darkergrey};
`;

export const ModalBox = styled.div`
  background-color: ${COLORS.background};
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${COLORS.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledButton = styled.button`
  padding: 4px;
  background-color: ${COLORS.secondary};
  color: ${COLORS.primary};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
  }
`;

export const InviteFriendsList = styled.div`
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

export const InviteFriendsListScroll = styled.div`
  overflow-y: auto;
  background-color: ${COLORS.darkergrey};
  border-radius: 8px;
  padding: 16px;
  height: 300px;

  h4 {
    padding: 8px;
  }
`;
