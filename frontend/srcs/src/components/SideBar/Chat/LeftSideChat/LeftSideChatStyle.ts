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
  overflow-y: auto;
  padding:8px;
  border-top-left-radius: 8px;
  box-sizing: border-box;
`;

export const ChatManagerTitle = styled.h3`
  font-weight: bold;
  color: ${COLORS.primary};
`;
