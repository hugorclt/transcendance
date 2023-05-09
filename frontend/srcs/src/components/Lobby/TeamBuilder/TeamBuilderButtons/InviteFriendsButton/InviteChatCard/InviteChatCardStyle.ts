import styled from "styled-components";
import { COLORS } from "../../../../../../colors";

export const InviteChatCardContainer = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: start;
  border-radius: 8px;
  padding: 8px;
  box-sizing: border-box;

  &:hover {
    background-color: ${COLORS.secondary};
  }
`;
