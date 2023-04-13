import React from "react";
import { ItemsCardsContainer, ItemsCardsMiddle } from "./ItemsCardsStyle";
import { TItemsProps } from "./ItemsCardType";

function ItemsCards({ name, desc, price, image }: TItemsProps) {
  return (
    <ItemsCardsContainer
      style={{
        backgroundPosition: "center center",
        backgroundImage: `url(data:image/gif;base64,${image})`,
        backgroundSize: "cover",
      }}>
      <div className="top-text">
        <h5>{price}</h5>
      </div>
      <div className="bottom-text">
        <h4>{name}</h4>
        <h5>{desc}</h5>
        <button>BUY</button>
      </div>
    </ItemsCardsContainer>
  );
}

export default ItemsCards;
