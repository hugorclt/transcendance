import styled from "styled-components";
import { COLORS } from "../../../../colors";

export const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 80%;
  align-items: center;
  justify-content: flex-start;
`;

export const TeamInfoContainer = styled.div`
  display: flex;
  padding: 8px;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  height: 10%;
`;

export const TeamStatusContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
`;

export const TeamCardsContainer = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
