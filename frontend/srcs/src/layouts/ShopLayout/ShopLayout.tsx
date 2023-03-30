import React from "react";
import { mediaSize } from "../../mediaSize";
import MediaQuery from "react-responsive";
import { ShopContainer } from "./ShopLayoutStyle";
import ItemsList from "../../components/Shop/ItemsList/ItemsList";

function ShopLayout() {
  return (
    <>
      <ShopContainer>
        <ItemsList />
      </ShopContainer>
    </>
  );
}

export default ShopLayout;
