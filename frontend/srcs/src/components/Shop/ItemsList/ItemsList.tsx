import React, { useEffect, useState } from "react";
import ItemsCards from "./ItemsCard/ItemsCards";
import {
  CardsContainer,
  ShopTopBarContainer,
  ShopTopBarSelect,
  SliderShopContainer,
} from "./ItemsListStyle";
import MediaQuery from "react-responsive";
import { mediaSize } from "../../../mediaSize";
import { TItemsProps } from "./ItemsCard/ItemsCardType";
import { nanoid } from "nanoid";
import SliderMenu from "../../common/SliderMenu/SliderMenu";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";

function ItemsList() {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [errMsg, setErrMsg] = useState("");
  const [data, setData] = useState<TItemsProps[]>([]);

  useEffect(() => {
    axiosPrivate
      .get("items")
      .then((res: AxiosResponse) => {
        setData(res.data);
      })
      .catch((err: AxiosError) => {
        setErrMsg("Error while retrieving shop information, please refresh!");
      });
  }, []);

  return (
    <>
      <ShopTopBarContainer>
        <MediaQuery minWidth={mediaSize.tablet + 1}>
          <SliderShopContainer>
            <SliderMenu
              items={["ALL", "PADDLE"]}
              setState={setFilter}
              state={filter}
              flex={"flex-start"}
            />
          </SliderShopContainer>
        </MediaQuery>

        <MediaQuery maxWidth={mediaSize.tablet}>
          <ShopTopBarSelect onChange={(e) => setFilter(e.target.value)}>
            <option value="ALL">ALL</option>
            <option value="PADDLE">PADDLE</option>
          </ShopTopBarSelect>
        </MediaQuery>

        <input
          className="search-input"
          type="text"
          placeholder="SEARCH"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </ShopTopBarContainer>
        <CardsContainer>
          {data.flatMap((item) => {
            if (filter != "ALL") {
              if (item.type != filter) return;
            }
            const matches = item.name
              .toLocaleUpperCase()
              .includes(search.toLocaleUpperCase());
            if (!matches) return;

            return (
              <ItemsCards
                key={nanoid()}
                name={item.name}
                desc={item.desc}
                price={item.price}
                image={item.image}
                type={item.type}
                owned={item.owned}
                setData={setData}
              />
            );
          })}
        </CardsContainer>
      <p style={{ color: "red" }}>{errMsg}</p>
    </>
  );
}

export default ItemsList;
