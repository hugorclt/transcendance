import styled from "styled-components";
import { COLORS } from "../../../../../../colors";
import { screenSize } from "../../../../../../mediaSize";

export const InviteFriendCardContainer = styled.div`
  height: 50px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: start;
  border-radius: 8px;
  padding: 8px;
  @media (max-width: ${screenSize.tablet}) {
    width: 180px;
  }
  @media (${screenSize.tablet} < width < ${screenSize.laptop}) {
    width: 330px;
  }
  @media (min-width: ${screenSize.laptop}) {
    width: 460px;
  }

  &:hover {
    background-color: ${COLORS.secondary};
  }
`;
