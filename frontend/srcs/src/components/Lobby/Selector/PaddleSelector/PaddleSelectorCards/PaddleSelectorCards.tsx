import React, { useEffect, useState } from "react";
import { SelectorCardsContainer } from "./PaddleSelector.style";

function PaddleSelectorCards({ name, img, isSelected }) {
  return (
    <SelectorCardsContainer
      style={{
        backgroundPosition: "center center",
        backgroundImage: `url(data:image/gif;base64,${img})`,
        backgroundSize: "cover",
        boxShadow: isSelected ? "0px 0px 8px 0px #DB504A" : "",
        transition: "all 250ms ease-in",
        filter: name == "Base Paddle" ? "grayscale(100%)" : "",
      }}>
      </SelectorCardsContainer>
  );
}

export default PaddleSelectorCards;
