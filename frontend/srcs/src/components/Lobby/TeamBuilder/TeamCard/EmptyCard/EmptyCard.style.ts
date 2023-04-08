import styled from "styled-components";
import { COLORS } from "../../../../../colors";
import { screenSize } from "../../../../../mediaSize";

export const EmptyCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 600px;
  height: 30%;
  min-height: 40px;
  background-color: ${COLORS.background};
  border-radius: 8px;
`;
