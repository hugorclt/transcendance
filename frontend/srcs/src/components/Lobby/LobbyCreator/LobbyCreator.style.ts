import styled from "styled-components";
import { COLORS } from "../../../colors";
import { mediaSize } from "../../../mediaSize";

export const GameModeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonNoStyle = styled.button`
  border: none;
  background-color: inherit;
`;

export const GameModeCardsBody = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  align-items: center;
`;

export const GameModeButtonBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 30%;
  justify-content: center;
  align-items: center;

  @media (min-width: ${mediaSize.mobile}) {
    top: 80vh;
  }

  @media (max-width: ${mediaSize.mobile}) {
    top: 65vh;
  }
`;

export const GameModeButton = styled.button`
  background-color: ${COLORS.secondary};
  color: ${COLORS.primary};
  border-radius: 5px;
  padding: 4px;
  border: 2px solid ${COLORS.border};
`;

export const GameModeContainerMobile = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 8px;
  position: absolute;
  top: 22%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GameModeHero = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LobbyFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`

export const MoneyContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4px;
`

export const XpContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4px;

`