import styled from "styled-components";
import { COLORS } from "../../../../colors";

export const ChangePasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;

  h3 {
    color: ${COLORS.primary};
  }

  div {
    background-color: ${COLORS.border};
    margin:4px;
    border-radius: 5px;
    padding: 4px;

  }

  h4 {
    color: ${COLORS.border};

    &:hover {
      color: ${COLORS.primary};
    }
  }

  input {
    background-color: ${COLORS.border};
    margin: 4px;
    border:none;
    border-radius: 5px;
    padding: 4px;
    color: ${COLORS.primary}
  }

  button {
    background-color: ${COLORS.secondary};
    padding: 4px;
    color: ${COLORS.primary};
    border:none;
    border-radius:5px;
  }
`;
