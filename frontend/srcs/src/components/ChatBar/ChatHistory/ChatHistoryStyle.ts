import styled from "styled-components";
import { COLORS } from "../../../colors";

export const ChatHistoryTopBar = styled.div`
  padding: 8px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ChatHistoryTopBarTitle = styled.h3`
  color: ${COLORS.primary};
`;

export const ChatHistoryBox = styled.div`
    overflow-y: scroll;
    flex-grow: 1
`;