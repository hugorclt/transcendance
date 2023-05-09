import styled from "styled-components";
import { COLORS } from "../../../../../colors";
import { screenSize } from "../../../../../mediaSize";

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
  margin: 8px;
  cursor: pointer;

  &:hover {
  }
`;

export const InviteFriendsList = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  @media (max-width: ${screenSize.tablet}) {
    min-width: 200px;
  }
  @media (${screenSize.tablet} < width < ${screenSize.laptop}) {
    min-width: 350px;
  }
  @media (min-width: ${screenSize.laptop}) {
    min-width: 500px;
  }
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
  max-height: 300px;
  min-height: 100px;
  @media (max-width: ${screenSize.tablet}) {
    max-height: 200px;
    min-height: 100px;
  }
  @media (${screenSize.tablet} < width < ${screenSize.laptop}) {
    max-height: 300px;
    min-height: 100px;
  }
  @media (min-width: ${screenSize.laptop}) {
    max-height: 400px;
    min-height: 100px;
  }

  h4 {
    padding: 8px;
  }
`;

export const InviteChatListScroll = styled.div`
  overflow-y: auto;
  background-color: ${COLORS.darkergrey};
  border-radius: 8px;
  padding: 16px;
  @media (max-width: ${screenSize.tablet}) {
    max-height: 200px;
    min-height: 100px;
  }
  @media (${screenSize.tablet} < width < ${screenSize.laptop}) {
    max-height: 300px;
    min-height: 100px;
  }
  @media (min-width: ${screenSize.laptop}) {
    max-height: 400px;
    min-height: 100px;
  }

  h4 {
    padding: 8px;
  }
`;
