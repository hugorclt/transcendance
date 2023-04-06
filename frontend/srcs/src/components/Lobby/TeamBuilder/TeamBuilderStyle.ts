import styled from "styled-components";
import { COLORS } from "../../../colors";

export const GameTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 15%;
`;

export const GameTitleCard = styled.div`
  width: 40%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: ${COLORS.primary};
  }

  h3 {
    color: ${COLORS.primary};
  }
`;

export const CentralContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 70%;
`;

export const BotContainer = styled.div`
  display: flex;
  height: 15%;
  justify-content: center;
  align-items: center;
`;

export const GameStartButton = styled.button`
  width: 150px;
  height: 60px;
  background-color: ${COLORS.secondary};
  color: ${COLORS.primary};
  border-radius: 5px;
  padding: 4px;
  border: 2px solid ${COLORS.border};
`;

export const LobbyLeaveButton = styled.button`
  width: 150px;
  height: 60px;
  background-color: ${COLORS.secondary};
  color: ${COLORS.primary};
  border-radius: 5px;
  padding: 4px;
  border: 2px solid ${COLORS.border};
`;
