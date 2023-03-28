import styled from "styled-components";
import { COLORS } from "../../colors";

export const AuthFormContainer = styled.div`
  background-color: ${COLORS.tertiary};
  width: 70%;
  padding: 8px;

  .border-bottom {
    position: relative;
    background-color: ${COLORS.lightgrey};
    transition: 500ms ease-in-out;
    width: 100%;
    height: 1px;

    .border-slider {
      position: absolute;
      transition: 500ms ease-in-out;
      background-color: ${COLORS.secondary};
      width: 50%;
      height: 1px;
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
    background-color: ${COLORS.tertiary};
    outline: none;
    color: ${COLORS.primary};
    font-weight: bold;
    font-size: 24px;
  }
`;

export const SocialContainer = styled.div`
    background-color: ${COLORS.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    padding: 4px;
    border-radius: 8px;
`
