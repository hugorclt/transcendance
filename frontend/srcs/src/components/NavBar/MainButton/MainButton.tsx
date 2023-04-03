import React from "react";
import { HeptahedreContainer } from "../../common/Heptahedre/Heptahedre.style";
import { COLORS } from "../../../colors";

function MainButton() {
  return (
    <HeptahedreContainer>
      <svg
        width="95%"
        height="auto"
        viewBox="0 0 341 103"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          onClick={() => console.log("test")}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.91359e-05 0C0.431549 2.12618 1.7275 4.90253 3.74005 9.21405L30.0558 65.591C31.0258 67.669 31.5109 68.7081 32.2251 69.5404C32.8578 70.2777 33.6195 70.8935 34.4729 71.3578C35.4362 71.8819 36.5538 72.1386 38.7889 72.652L38.789 72.652L166.658 102.023C167.729 102.269 168.264 102.392 168.805 102.441C169.286 102.484 169.77 102.484 170.251 102.44C170.792 102.391 171.327 102.268 172.397 102.021L172.398 102.021L300.388 72.5282C302.58 72.023 303.677 71.7704 304.625 71.2592C305.466 70.8063 306.218 70.2066 306.848 69.4884C307.558 68.6779 308.049 67.6658 309.031 65.6415L336.319 9.38651C338.46 4.97353 339.826 2.15715 340.271 0H3.91359e-05Z"
          fill={COLORS.secondary}
        />
      </svg>
    </HeptahedreContainer>
  );
}

export default MainButton;
