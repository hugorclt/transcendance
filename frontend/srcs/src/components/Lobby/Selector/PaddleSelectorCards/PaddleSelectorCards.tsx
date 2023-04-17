import React from "react";
import { PaddleCardsContainer } from "./PaddleSelector.style";

function PaddleSelectorCards({ name, img }) {
  return (
    <PaddleCardsContainer
      style={{
        backgroundPosition: "center center",
        backgroundImage: `url(data:image/gif;base64,${img})`,
        backgroundSize: "cover",
      }}></PaddleCardsContainer>
  );
}

export default PaddleSelectorCards;
