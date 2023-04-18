import React from "react";
import { SelectorCardsContainer } from "../PaddleSelectorCards/PaddleSelector.style";

function MapSelectorCards({ name, img }) {
  return (
    <SelectorCardsContainer
      style={{
        backgroundPosition: "center center",
        backgroundImage: `url(data:image/gif;base64,${img})`,
        backgroundSize: "cover",
      }}></SelectorCardsContainer>
  );
}

export default MapSelectorCards;
