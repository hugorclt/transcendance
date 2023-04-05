import React, { useState } from "react";
import { COLORS } from "../../colors";
import { RankingTable } from "./Ranking.style";
import RankingCards from "./RankingCards/RankingCards";
import { useMediaQuery } from "react-responsive";
import { screenSize, mediaSize } from "../../mediaSize";
import MediaQuery from "react-responsive";
import { nanoid } from "nanoid";

const stats = ["win", "goal", "touch"];

const data = [
  { name: "hugo", stats: ["1050", "2002", "10053400"] },
  { name: "hugo", stats: ["1250", "20012", "10034500"] },
  { name: "hugo", stats: ["15260", "203", "100300"] },
  { name: "hugo", stats: ["10654", "210", "1002300"] },
  { name: "hugo", stats: ["10560", "2020", "1002300"] },
  { name: "hugo", stats: ["150", "20078", "100007"] },
  { name: "hugo", stats: ["13400", "20060", "100500"] },
  { name: "hugo", stats: ["10560", "200", "1000540"] },
  { name: "hugo", stats: ["10052", "20004", "1000340"] },
  { name: "hugo", stats: ["104350", "20007", "1000230"] },
];

function Ranking() {
  const [select, setSelect] = useState("win");
  const isTabletOrMobile = useMediaQuery({
    query: `(max-width: ${screenSize.laptop})`,
  });

  const getCategory = (user) => {
    const indexOf = stats.indexOf(select);
    return [user.stats[indexOf]];
  };

  const renderRow = () => {
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

      console.log(category);
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
        <thead>
          <tr>
            <td>
              <h4>NAME</h4>
            </td>
            {stats.map((stat) => {
              return (
                <td key={nanoid()}>
                  <h4>{stat}</h4>
                </td>
              );
            })}
          </tr>
        </thead>
      </MediaQuery>
      <MediaQuery maxWidth={mediaSize.laptop - 1}>
        <thead>
          <tr>
            <td>
              <select onChange={(e) => setSelect(e.target.value)}>
                {stats.map((stat) => {
                  return <option key={nanoid()}>{stat}</option>;
                })}
              </select>
            </td>
          </tr>
        </thead>
      </MediaQuery>
      <tbody>{renderRow()}</tbody>
    </RankingTable>
  );
}

export default Ranking;
