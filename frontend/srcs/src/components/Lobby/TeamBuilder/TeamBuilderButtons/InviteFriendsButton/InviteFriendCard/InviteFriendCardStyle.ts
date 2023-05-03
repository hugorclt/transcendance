import styled from "styled-components";
import { COLORS } from "../../../../../../colors";

export const InviteFriendCardContainer = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  cursor: pointer;
  flex-direction: row;
  justify-content: start;
  border-radius: 8px;
  padding: 8px;

  &:hover {
    background-color: ${COLORS.secondary};
  }

  .div {
    display: flex;
    flex-direction: column;
  }
`;
