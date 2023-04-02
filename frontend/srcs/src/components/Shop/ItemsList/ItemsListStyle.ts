import styled from "styled-components";
import { COLORS } from "../../../colors";

export const ShopTopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;

  input {
    border: none;
    background-color: ${COLORS.border};
    color: ${COLORS.primary};
    padding: 8px;
    border-radius: 8px;
  }
`;

export const ShopTopBarFilter = styled.div`
  button {
    margin-right: 32px;
    border: none;
    background-color: inherit;
    color: ${COLORS.primary};
    font-size: 2rem;
    font-weight: bold;
  }
`;

export const ShopTopBarSelect = styled.select`
  background-color: ${COLORS.secondary};
  border: none;
  border-radius: 8px;
  color: ${COLORS.primary};
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-grow: 1;
  overflow-y: auto;
`;

