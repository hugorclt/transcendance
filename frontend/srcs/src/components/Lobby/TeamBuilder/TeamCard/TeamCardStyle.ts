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
  padding: 10px;
  align-items: center;
  width: 100%;
  height: 10%;
  background-color: ${COLORS.secondary};
`;

export const TeamStatusContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
`;

export const TeamName = styled.h2`
  color: ${COLORS.primary};
`;

export const TeamNbPlayers = styled.h2`
  color: ${COLORS.primary};
`;

export const TeamCardsContainer = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
