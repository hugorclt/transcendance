import styled from "styled-components";
import { screenSize } from "../../../../mediaSize";

export const ChangeTeamButtonContainer = styled.div`
  background-color: red;
  margin: 24px;
  box-sizing: border-box;
  @media (max-width: ${screenSize.tablet}) {
    width: 24px;
    height: 24px;
  }
  @media (${screenSize.tablet} < width < ${screenSize.laptop}) {
    width: 32px;
    height: 32px;
  }
`;
