import styled from "styled-components";
import { COLORS } from "../../../colors";

export const ShopTopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    border: none;
    background-color: ${COLORS.border};
    color: ${COLORS.primary};
    padding: 8px;
    border-radius: 8px;
    height: 16px;
  }
`;

export const SliderShopContainer = styled.div`
  width: fit-content;
`

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
  padding: 8px;
`;

export const CardsContainer = styled.div`
  width:100%;
  height:100%;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(304px, max-content));
  justify-content: center;
  gap: 32px;
  grid-auto-flow: dense;
`;