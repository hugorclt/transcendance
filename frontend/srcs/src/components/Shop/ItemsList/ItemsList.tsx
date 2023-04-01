import React, { useState } from "react";
import ItemsCards from "./ItemsCard/ItemsCards";
import {
  CardsContainer,
  ShopTopBarContainer,
  ShopTopBarFilter,
  ShopTopBarSelect,
} from "./ItemsListStyle";
import MediaQuery from "react-responsive";
import { mediaSize } from "../../../mediaSize";
// import greenp from "../../../assets/images/paddle/green.png";
import bluep from "../../../assets/images/paddle/bluep.gif";
import { nanoid } from "nanoid";
// import yellowp from "../../../assets/images/paddle/yellow.png";
// import purplep from "../../../assets/images/paddle/purple.png";

const data = [
  {
    name: "YELLOW-PADDLE",
    desc: "Gotta go fast",
    price: "1500",
    type: "PADDLE",
    owned: false,
    image: "yellowp",
  },
  {
    name: "BLUE-PADDLE",
    desc: "Let's twist",
    price: "1500",
    type: "PADDLE",
    owned: false,
    image: bluep,
  },
  {
    name: "GREEN-PADDLE",
    desc: "idkt",
    price: "1500",
    type: "PADDLE",
    owned: false,
    image: "greenp",
  },
  {
    name: "PURPLE-PADDLE",
    desc: "yo le rap",
    price: "1500",
    type: "PADDLE",
    owned: true,
    image: "purplep",
  },
];

function ItemsList() {
  const [filter, setFilter] = useState("ALL");

  return (
    <>
      <ShopTopBarContainer>

        <MediaQuery minWidth={mediaSize.mobile + 1}>
          <ShopTopBarFilter>
            <button onClick={() => setFilter("ALL")}>ALL</button>
            <button onClick={() => setFilter("PADDLE")}>PADDLE</button>
            <button onClick={() => setFilter("TRAILS")}>TRAILS</button>
            <button onClick={() => setFilter("GOAL")}>GOAL</button>
          </ShopTopBarFilter>
        </MediaQuery>

        <MediaQuery maxWidth={mediaSize.mobile}>
          <ShopTopBarSelect onChange={(e) => setFilter(e.target.value)}>
            <option value="ALL">ALL</option>
            <option value="PADDLE">PADDLE</option>
            <option value="TRAILS">TRAILS</option>
            <option value="GOAL">GOAL</option>
          </ShopTopBarSelect>
        </MediaQuery>

        <input className="search-input" type="text" placeholder="SEARCH" />
      </ShopTopBarContainer>
      <CardsContainer>
        {/* <ScrollableDiv> */}
          {data.flatMap((item) => {
            if (filter != "ALL") {
              if (item.type != filter) return;
            }
            console.log(item.image)
            return (
              <ItemsCards
                key={nanoid()}
                name={item.name}
                desc={item.desc}
                price={item.price}
                image={item.image}
              />
            );
          })}
        {/* </ScrollableDiv> */}
      </CardsContainer>
    </>
  );
}

export default ItemsList;
