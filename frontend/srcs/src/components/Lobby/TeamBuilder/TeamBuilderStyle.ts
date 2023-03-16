import styled from "styled-components";
import { COLORS } from "../../../colors";

export const TeamBuilderContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.darkergrey};
  width: flex-grow;
  height: 100%;
`;

export const GameTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 15%;
`;

export const GameTitle = styled.h1`
  color: ${COLORS.primary};
`;

export const GamePlayersMode = styled.h3`
  color: ${COLORS.primary};
`;

export const GameTitleCard = styled.div`
  width: 40%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CentralContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 70%;
`;

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

export const InviteFriendButton = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${COLORS.darkergrey};
`;

export const TeamCardsContainer = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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
