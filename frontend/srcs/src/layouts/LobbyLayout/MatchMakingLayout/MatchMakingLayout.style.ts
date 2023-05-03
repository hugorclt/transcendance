import styled from "styled-components";
import { COLORS } from "../../../colors";

export const MatchMakingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
  position: relative;
  z-index: 0;

  h3 {
    text-align: center;
  }

  .loading {
    font-weight: bold;
    display: inline-block;
    clip-path: inset(0 3ch 0 0);
    animation: l 3s steps(4) infinite;
  }

  @keyframes l {
    to {
      clip-path: inset(0 -1ch 0 0);
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(1turn);
    }
  }

  &::before {
    content: "";
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: #1a232a;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      transparent,
      ${COLORS.secondary},
      transparent 30%
    );
    animation: rotate 4s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 10px;
    top: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    background: ${COLORS.background};
    border-radius: 5px;
  }
`;
