import styled from "styled-components";
import { COLORS } from "../../../colors";

export const CardsContainer = styled.div`
  height: 70vh;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
`;

export const ScrollableDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const ShopTopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px;

  input {
    padding: 6px;
    background-color: ${COLORS.grey};
    border: 1px;
    border-color: ${COLORS.border};
    border-radius: 8px;
  }

  input::placeholder {
    color: ${COLORS.primary};
  }
`;

export const ShopTopBarFilter = styled.div`
  display: flex;

  button {
    border: none;
    background-color: ${COLORS.background};
    color: ${COLORS.primary};
    font-weight: bold;
    font-size:1.5em;
    margin: 16px;
  }
`;

export const ShopBarSelect = styled.select`
  border: none;
  background-color: ${COLORS.secondary};
  border-radius: 8px;
`;
