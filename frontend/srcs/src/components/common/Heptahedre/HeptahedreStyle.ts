import styled from "styled-components";
import { COLORS } from "../../../colors";

export const HeptahedreContainer = styled.div<{width: string}>`
  height: auto;
  width: ${props => props.width};
  max-width: 600px;
  min-width: 438px;
  display: flex;
  justify-content: center;
  position: relative;
  svg {
    -webkit-filter: drop-shadow(4px 4px 3px rgba(0, 0, 0, 0.7));
    filter: drop-shadow(4px 4px 3px rgba(0, 0, 0, 0.7));
  }
  h1 {
    position: absolute;
  }
`;
