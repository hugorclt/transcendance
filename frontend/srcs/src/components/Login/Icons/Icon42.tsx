import React, { MouseEvent } from "react";
import { COLORS } from "../../../colors";
import { SocialContainer } from "../AuthForm/AuthForm.style";

function Icon42() {
  const url42: string = import.meta.env["VITE_42URL"]!;

  return (
    <SocialContainer>
      <a href={url42}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          width="32px"
          height="32px"
          version="1.1"
          strokeWidth="0"
          enableBackground="new 0 0 48 48"
          fill={COLORS.lightgrey}
          viewBox="0 -200 960 960">
          <path d="M32 412.6L362.1 412.6 362.1 578 526.8 578 526.8 279.1 197.3 279.1 526.8 -51.1 362.1 -51.1 32 279.1z"></path>
          <path d="M597.9 114.2L762.7 -51.1 597.9 -51.1z"></path>
          <path d="M762.7 114.2L597.9 279.1 597.9 443.9 762.7 443.9 762.7 279.1 928 114.2 928 -51.1 762.7 -51.1z"></path>
          <path d="M928 279.1L762.7 443.9 928 443.9z"></path>
        </svg>
      </a>
    </SocialContainer>
  );
}

export default Icon42;
