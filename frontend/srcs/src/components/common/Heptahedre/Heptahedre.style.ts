import styled from "styled-components";

export const HeptahedreContainer = styled.div`
  width: 100%;
  max-width: 500px;
  min-width: 340px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 10;

  cursor: pointer;
  svg {
    -webkit-filter: drop-shadow(4px 4px 3px rgba(0, 0, 0, 0.7));
    filter: drop-shadow(4px 4px 3px rgba(0, 0, 0, 0.7));
  }
`;
