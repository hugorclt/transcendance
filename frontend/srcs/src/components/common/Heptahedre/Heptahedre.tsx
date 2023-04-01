import React from "react";
import { COLORS } from "../../../colors";
import { HeptahedreContainer } from "./HeptaHeaderStyle";
import { THeptrahedreProps } from "./THeptahedre";

function Heptahedre({ firstText, secondText }: THeptrahedreProps) {
  return (
    <HeptahedreContainer>
      <svg
        width="100%"
        height="auto"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 10 376 119"
      >
        <path
          fill={COLORS.secondary}
          d="M192.87 117.689c-1.07.247-1.606.37-2.147.42a7.926 7.926 0 0 1-1.445 0c-.541-.049-1.077-.172-2.147-.418L42.964 84.577c-2.164-.497-3.247-.746-4.186-1.247a8.001 8.001 0 0 1-2.207-1.737c-.708-.796-1.204-1.79-2.195-3.777L3.3 15.523C1.432 11.778.498 9.905.472 8.08a8 8 0 0 1 1.326-4.525C2.805 2.032 4.603.96 8.198-1.184l93.905-56.01c1.128-.672 1.692-1.008 2.293-1.246a7.994 7.994 0 0 1 1.656-.456C106.69-59 107.347-59 108.66-59h162.325c1.329 0 1.994 0 2.64.106a8.02 8.02 0 0 1 1.674.467c.607.244 1.176.588 2.313 1.276L368.375-2.23c3.409 2.063 5.114 3.094 6.098 4.551a8.01 8.01 0 0 1 1.369 4.34c.03 1.758-.774 3.58-2.382 7.226l-27.945 63.357c-.949 2.152-1.423 3.227-2.141 4.09a7.997 7.997 0 0 1-2.277 1.883c-.982.543-2.128.807-4.419 1.335L192.87 117.689Z"
        />
      </svg>
      <h1>PONG</h1>
    </HeptahedreContainer>
  );
}

export default Heptahedre;
