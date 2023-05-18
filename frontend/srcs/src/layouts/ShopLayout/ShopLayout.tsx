import React from "react";
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
