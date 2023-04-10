import styled from "styled-components";
import { COLORS } from "../../../../colors";

export const UnbanContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 16px;

  h3 {
    color: ${COLORS.primary};
    margin-bottom: 8px;
  }
`;

export const UnbanCardsBox = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${COLORS.darkergrey};
  border-radius: 8px;
  overflow-y: auto;
`;
