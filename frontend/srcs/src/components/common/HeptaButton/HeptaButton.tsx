import React from "react";
import { COLORS } from "../../../colors";
import { HeptaButtonContainer } from "./HeptaButtonStyle";
import { THeptaButtonProps } from "./HeptaButtonType";

const HeptaButton = ({ width, height, text }: THeptaButtonProps) => (
  <HeptaButtonContainer>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 146 69">
      <path
        fill={COLORS.secondary}
        d="M76.493 67.491c-1.073.248-1.61.372-2.152.421a8 8 0 0 1-1.448 0c-.543-.048-1.08-.172-2.152-.419l-49.866-11.48c-2.166-.499-3.248-.748-4.188-1.25a8.001 8.001 0 0 1-2.207-1.74c-.707-.796-1.203-1.791-2.193-3.78L5.281 35.165c-1.862-3.74-2.793-5.61-2.818-7.433a8 8 0 0 1 1.324-4.52c1.006-1.521 2.799-2.593 6.385-4.737L38.043 1.813c1.13-.675 1.694-1.012 2.297-1.25a8 8 0 0 1 1.658-.459C42.638 0 43.296 0 44.611 0h57.848c1.332 0 1.998 0 2.645.107a8.02 8.02 0 0 1 1.677.469c.608.244 1.177.589 2.316 1.28l27.002 16.376c3.401 2.063 5.102 3.094 6.084 4.55a8 8 0 0 1 1.367 4.334c.03 1.755-.771 3.576-2.373 7.216l-6.34 14.409c-.948 2.153-1.422 3.23-2.139 4.093a8.003 8.003 0 0 1-2.277 1.885c-.982.544-2.128.809-4.42 1.338L76.493 67.49Z"
      />
      <path
        fill={COLORS.secondary}
        d="M2.5 8a8 8 0 0 1 8-8h125a8 8 0 0 1 8 8v19.062H2.5V8Z"
      />
      <text
        fill={COLORS.primary}
        fontWeight="bold"
        fontSize="1.5em"
        y="50%"
        x="50%"
        dominantBaseline="middle"
        textAnchor="middle">
        {text}
      </text>
    </svg>
  </HeptaButtonContainer>
);

export default HeptaButton;
