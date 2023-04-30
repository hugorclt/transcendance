import styled from "styled-components";
import { COLORS } from "../../../colors";

export const ProfilBoxLink = styled.a`
  width: 100%;
  display: flex;
`;

export const ProfilBoxLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  position: relative;
`;

export const ProfilBoxName = styled.h3`
  font-weight: bold;
  color: ${COLORS.primary};
  width: fit-content;
  position: relative;
  margin-bottom: 4px;
  white-space: nowrap;
`;

export const ProfileBoxStatus = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  position: absolute;
  top: 0px;
  right: -8px;
`;

export const ExperienceBarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ExperienceBar = styled.div`
  background-color: black;
  outline: 1px solid ${COLORS.primary};
  height: 16px;
  width: 70%;
  margin: 6px;
`;

export const LevelExperienceBar = styled.div`
  background-color: ${COLORS.secondary};
  height: 16px;
`;

export const ProfilBoxRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items:flex-end;
  width: 50%;
`;

export const CurrencyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 41px;
  margin-bottom:4px;
`

export const SelectBox = styled.div`
  display:flex;
  align-items: center;
  height:24px;
`

export const StyledSelect = styled.select`
  outline: none;
  border: none;
  background-color: ${COLORS.background};
  color: ${COLORS.primary};
  opacity:50%;
  cursor: pointer;
`
