import styled from "styled-components";
import { COLORS } from "../../../../colors";

export const StatBoxContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${COLORS.background};
  text-align: center;
  vertical-align: middle;
  color: white;
`;

export const IdContainer = styled.div`
  width: 25%;
  height: 100%;
  color: white;
  background-color: #292929;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    font-size: 20px;
  }
`;

export const LvlBoxContainer = styled.div`
  width: 25%;
  height: 100%;
  color: white;
  background-color: #19191a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    font-size: 20px;
  }
`;

export const NbGameContainer = styled.div`
  width: 25%;
  height: 100%;
  color: white;
  background-color: #292929;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    font-size: 20px;
  }
`;

export const NbWinContainer = styled.div`
  width: 25%;
  height: 100%;
  color: white;
  background-color: #19191a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    font-size: 20px;
  }
`;
