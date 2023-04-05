import styled from "styled-components";
import { COLORS } from "../../../../colors";

export const PlayerCardLeftBorder = styled.div`
  width: 8px;
  height: 100%;
  background-color: ${COLORS.blue};
`;

export const PlayerCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 20%;
  background-color: ${COLORS.black};
`;

export const PlayerCardName = styled.h1`
  color: ${COLORS.primary};
`;

export const PlayerCardAvatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 21px;
`;

export const PlayerCardStatus = styled.h3`
  color: ${COLORS.darkgrey};
`;

export const PlayerInfoContainer = styled.div`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  display: flex;
  height: 100%;
`;
