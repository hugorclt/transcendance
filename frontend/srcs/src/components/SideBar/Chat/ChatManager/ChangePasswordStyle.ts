import styled from "styled-components";
import { COLORS } from "../../../../colors";

export const ChangePasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 16px;

  h4 {
    color: ${COLORS.primary};
  }

  div {
  }

  p {
    color: ${COLORS.border};

    &:hover {
      color: ${COLORS.primary};
    }
  }

  input {
    background-color: ${COLORS.border};
    margin: 4px;
    border: none;
    border-radius: 5px;
    padding: 8px;
    color: ${COLORS.primary};
    width: 100%;
    box-sizing: border-box;
  }

  button {
    background-color: ${COLORS.secondary};
    padding: 8px;
    color: ${COLORS.primary};
    border: none;
    border-radius: 5px;
    margin: 4px;
    width: 100%;
    margin-bottom: 16px;

  }
`;

export const InputButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  form {
    width: 100%;
  }
`
export const ChangeImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }

  input {
    width: 50%;
  }
`;

export const PasswordContainer = styled.div`
  background-color: ${COLORS.border};
  margin: 4px;
  border-radius: 5px;
  padding: 4px;
  margin-bottom: 16px;
  width:100%;
  box-sizing: border-box;
`;
