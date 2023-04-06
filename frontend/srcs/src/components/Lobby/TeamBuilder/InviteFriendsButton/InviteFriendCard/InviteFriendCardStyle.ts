import styled from "styled-components";
import { COLORS } from "../../../../../colors";

export const InviteFriendCardContainer = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  background-color: ${COLORS.white};
  padding: 8px;

  .div {
    display: flex;
    flex-direction: column;
  }
`;
