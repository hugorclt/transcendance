import styled from "styled-components";
import { COLORS } from "../../../../../colors";
import { screenSize } from "../../../../../mediaSize";

export const EmptyCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  max-width: 600px;
  height: 30%;
  background-color: ${COLORS.background};
  border-radius: 8px;
`;
