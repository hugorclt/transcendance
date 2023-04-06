import styled from "styled-components";
import { COLORS } from "../../colors";

export const SettingsContainer = styled.div`
  display: flex;
  background-color: ${COLORS.background};
  border-radius: 8px;
  border: 1px solid ${COLORS.border};
  padding: 6px;
`;

export const SettingsLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid ${COLORS.border};
  padding: 8px;
  margin: 4px;

  h4 {
    margin: 4px;
  }
`;

export const SettingsRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  
  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  input {
    box-sizing: border-box;
    margin-bottom: 12px;
    width: 245px;
  }

  button {
    background-color: ${COLORS.secondary};
    padding: 8px;
    border: none;
    border-radius: 8px;
    margin-bottom: 12px;
    margin-left: 8px;
    width: 150px;
  }
`;

export const PhotoContainer = styled.div`
  background-color: white;
  width: 250px;
  height: 250px;
  border-radius: 125px;
  margin: 8px;
`;
