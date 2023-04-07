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
`;

export const StyledButton = styled.input`
  padding: 4px;
  background-color: ${COLORS.secondary};
  color: ${COLORS.primary};
  border: none;
  border-radius: 5px;
`;
