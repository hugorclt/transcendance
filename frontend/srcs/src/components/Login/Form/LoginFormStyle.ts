import styled from "styled-components";
import { COLORS } from "../../../colors";

export const LoginFormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  input {
    transition: ease-in 350ms;
    padding: 12px;
    width: 100%;
    border: none;
    border-radius: 8px;
    box-sizing: border-box;
    margin: 12px 0;
    background-color: ${COLORS.grey};
    box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.7);
  }

  input:hover {
    transform: translateY(-2px);
    box-shadow: rgba(255, 127, 0, 0.4) -3px 5px,
      rgba(255, 127, 0, 0.3) -6px 10px, rgba(255, 127, 0, 0.2) -9px 15px;
  }

  input::placeholder {
    color: ${COLORS.primary};
    font-size: 1.5em;
  }

  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    outline: inherit;
    align-self: center;
    position: absolute;
    top: 50vh;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;
