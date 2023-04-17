import styled from "styled-components";
import { COLORS } from "../../../../colors";

export const ItemsCardsContainer = styled.div`
  width: 304px;
  height: 304px;
  border-radius: 8px;
  box-sizing: border-box;
  position: relative;
  border: 1px solid ${COLORS.border};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  button {
    display: none;
    background-color: ${COLORS.secondary};
    color: ${COLORS.primary};
    padding: 8px;
    border: 1px solid ${COLORS.border};
    border-radius: 8px;
  }
  .top-text {
    display: flex;
    justify-content: end;
    color: ${COLORS.white};
    margin: 8px;
  }

  .bottom-text {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    color: ${COLORS.white};
    margin: 8px;
  }

  &:hover button {
    display: block;
    filter: none;
  }
`;

export const ItemsCardsMiddle = styled.div`
  display: flex;
  justify-content: center;
`;

export const ModalConfirmContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  button {
    background-color: ${COLORS.secondary};
    padding: 8px;
    border-radius: 8px;
    font-weight: bold;
    border: none;
    color: ${COLORS.primary};
    margin: 8px;
    width: 50px;

  }
`;

export const CardsContainerCenter = styled.div`
  display: flex;
  justify-content: center;
`