import styled from "styled-components";
import { COLORS } from "../../../../colors";

export const ItemsCardsContainer = styled.div`
  width: 304px;
  height: 304px;
  border-radius: 8px;
  box-sizing: border-box;
  position: relative;
  margin:32px;

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
    height: 90%;
    color: ${COLORS.white};
    margin: 8px;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    z-index: -1;
  }
`;
