import styled from "styled-components";
import { COLORS } from "../../../colors";

export const ProfilBoxLink = styled.a`
  width: 100%;
  display: flex;
`;

export const ProfileBoxLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const ProfileBoxName = styled.h1`
  font-family: "IBM Plex Mono";
  font-weight: bold;
  color: ${COLORS.primary};
  width:fit-content;
  position: relative;
  margin-bottom: 8px;
`;

export const ProfileBoxStatus = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  position: absolute;
  top: 0px;
  right: -5px;
`;

export const ExperienceBar = styled.div`
  background-color: black;
  outline: 1px solid ${COLORS.primary};
  height: 17px;
  width: 75%;
`;

export const LevelExperienceBar = styled.div`
  background-color: ${COLORS.secondary};
  width: 20%;
  height: 17px;
`;
