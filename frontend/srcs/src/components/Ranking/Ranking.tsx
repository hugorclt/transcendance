import React, { useState } from "react";
import { COLORS } from "../../colors";
import {
  RankingBody,
  RankingTable,
  TableData,
  TableRow,
} from "./Ranking.style";
import RankingCards from "./RankingCards/RankingCards";
import { useMediaQuery } from "react-responsive";
import { screenSize, mediaSize } from "../../mediaSize";
import MediaQuery from "react-responsive";
import { nanoid } from "nanoid";
import { IoMdArrowDropup } from "react-icons/io";
import { ShopTopBarSelect } from "../Shop/ItemsList/ItemsListStyle";

const stats = ["WIN", "GOALS", "TOUCH"];

const data = [
  { name: "dylan", stats: ["8", "2", "3"] },
  { name: "hugo", stats: ["2", "7", "4"] },
  { name: "dume", stats: ["5", "6", "7"] },
  { name: "Ryad", stats: ["9", "5", "2"] },
];

function Ranking() {
  const [select, setSelect] = useState("WIN");
  const isTabletOrMobile = useMediaQuery({
    query: `(max-width: ${screenSize.laptop})`,
  });

  const getCategory = (user) => {
    const indexOf = stats.indexOf(select);
    return [+user.stats[indexOf]];
  };

  const renderRow = (selected) => {
    data.sort((a, b) => getCategory(a) < getCategory(b) ? 1 : -1)

    return data.map((user, index) => {
      var color;
      var category;
      if (index % 2 == 0) color = COLORS.background;
      else color = COLORS.darkergrey;

      if (isTabletOrMobile && select != "ALL") {
        category = getCategory(user);
      } else {
        category = user.stats;
      }
      return (
        <RankingCards
          key={nanoid()}
          index={index + 1}
          name={user.name}
          stats={category}
          color={color}
        />
      );
    });
  };

  return (
    <RankingTable>
      <MediaQuery minWidth={mediaSize.laptop}>
        <TableRow>
          <TableData>
            <h4>NAME</h4>
          </TableData>
          {stats.map((stat) => {
            return (
              <TableData onClick={() => setSelect(stat)} key={nanoid()}>
                <h4>{stat}</h4>
                {stat == select ? <IoMdArrowDropup color={COLORS.primary} size={22} /> : <></>}
              </TableData>
            );
          })}
        </TableRow>
      </MediaQuery>
      <MediaQuery maxWidth={mediaSize.laptop - 1}>
        <TableRow>
          <TableData>
            <ShopTopBarSelect value={select} onChange={(e) => setSelect(e.target.value)}>
              {stats.map((stat) => {
                return <option key={nanoid()}>{stat}</option>;
              })}
            </ShopTopBarSelect>
          </TableData>
        </TableRow>
      </MediaQuery>
      <RankingBody>{renderRow(select)}</RankingBody>
    </RankingTable>
  );
}

export default Ranking;
