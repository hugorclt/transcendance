import styled from "styled-components";
import { COLORS } from "../../../../colors";
import { screenSize } from "../../../../mediaSize";

export const PlayerCardLeftBorder = styled.div`
  @media (max-width: ${screenSize.laptop}) {
    width: 4px;
  }
  @media (min-width: ${screenSize.laptop}) {
    width: 8px;
  }
  height: 100%;
  background-color: ${COLORS.blue};
`;

export const PlayerCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  max-width: 600px;
  height: 30%;
  background-color: ${COLORS.primary};
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;

  h4 {
    color: ${COLORS.darkergrey};
  }
`;

export const PlayerNameContainer = styled.div`
  width: 60%;
`;

export const PlayerCardAvatar = styled.img`
  aspect-ratio: 1/1;
  height: 70%;
  border-radius: 20px;
`;

export const PlayerInfoContainer = styled.div`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  display: flex;
  height: 100%;
`;
