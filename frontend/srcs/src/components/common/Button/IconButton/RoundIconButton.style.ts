import styled from "styled-components";
import { COLORS } from "../../../../colors";

export const RoundIconButtonContainer = styled.div`
  cursor: pointer;
  pointer-events: all;
  border-radius: 100%;
  aspect-ratio: 1/1;
  background-color: ${COLORS.darkergrey};

  &.disabled {
    pointer-events: none;
  }
`;
