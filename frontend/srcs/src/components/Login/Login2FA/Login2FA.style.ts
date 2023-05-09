import styled from "styled-components";
import { COLORS } from "../../../colors";

export const Login2FAContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Form2FaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;

  input {
    width: 100%;
  }

  h4 {
    margin-bottom: 12px;
    color: ${COLORS.secondary}
  }

  p {
    margin-bottom: 12px;
  }

  input {
    height: 28px;
  }
`;
