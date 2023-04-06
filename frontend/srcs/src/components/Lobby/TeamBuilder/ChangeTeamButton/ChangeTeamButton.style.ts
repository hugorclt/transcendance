import styled from "styled-components";
import { screenSize } from "../../../../mediaSize";

export const ChangeTeamButtonContainer = styled.div`
  @media (max-width: ${screenSize.tablet}) {
    width: 32px;
    height: 32px;
    background-color: red;
  }
`;
