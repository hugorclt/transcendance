import styled from "styled-components";
import { COLORS } from "../../colors";

export const AuthFormContainer = styled.div`
  width: 290px;
  padding: 8px;
  border-radius: 8px;
  position: absolute;
  top: 30%;

  .border-bottom {
    position: relative;
    background-color: ${COLORS.lightgrey};
    transition: 500ms ease-in-out;
    width: 100%;
    height: 2px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;

    .border-slider {
      border-radius: 8px;
      position: absolute;
      transition: 500ms ease-in-out;
      background-color: ${COLORS.secondary};
      width: 50%;
      height: 2px;
    }

    .border-slider-register {
      transform: translateX(101%);
    }
  }

  .div-social {
    display: flex;
    justify-content: space-between;
    padding: 16px;
  }
`;

export const FormSelector = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    border: none;
    outline: none;
    background-color: ${COLORS.background};
    color: ${COLORS.lightgrey};
    font-weight: bold;
    font-size: 1.5em;
  }
`;

export const SocialContainer = styled.div`
  background-color: ${COLORS.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  padding: 4px;
  border-radius: 64px;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.7);
  transition: ease-in 350ms;

  button {
    border: none;
    background-color: ${COLORS.grey};
  }

  &:hover {
    box-shadow: rgba(255, 127, 0, 0.4) -3px 3px, rgba(255, 127, 0, 0.3) -6px 6px,
      rgba(255, 127, 0, 0.2) -9px 9px;
  }
`;
