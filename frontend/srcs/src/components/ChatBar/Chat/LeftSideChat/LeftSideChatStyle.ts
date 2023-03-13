import styled from "styled-components";
import { COLORS } from "../../../../colors";

export const ChatManagerBox = styled.div`
  width: 200px;
  height: 100%;
  position: absolute;
  left: -200px;
  background-color: ${COLORS.background};
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding:4px;
`;

export const ChatManagerTitle = styled.h3`
  font-weight: bold;
  color: ${COLORS.primary};
`;
