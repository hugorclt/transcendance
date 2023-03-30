import styled from "styled-components";

export const HeptahedreContainer = styled.div`
  height: auto;
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  position: relative;
  svg {
    -webkit-filter: drop-shadow(4px 4px 3px rgba(0, 0, 0, 0.7));
    filter: drop-shadow(4px 4px 3px rgba(0, 0, 0, 0.7));
    max-width: 600px;
  }
  h1 {
    position: absolute;
    font-size: 300%;
    top: 15%;
  }
`;
