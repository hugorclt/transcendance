import styled from "styled-components";
import { COLORS } from "../../colors";

export const ItemsContainer = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &:last-child {
    justify-content: flex-start;
  }
`;

export const MiddleItemContainer = styled.div`
  flex-grow: 1;
`;
