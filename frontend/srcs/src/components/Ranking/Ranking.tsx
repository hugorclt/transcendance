import React, { useEffect, useState } from "react";
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
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { ShopTopBarSelect } from "../Shop/ItemsList/ItemsListStyle";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";

const stats = ["WIN", "GOALS"];

function Ranking() {
  const [select, setSelect] = useState("WIN");
  const [asc, setAsc] = useState(true);
  const isTabletOrMobile = useMediaQuery({
    query: `(max-width: ${screenSize.laptop})`,
  });
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<any[]>([]);
  const [errMsg, setErrMsg] = useState("");

  const getCategory = (user) => {
    const indexOf = stats.indexOf(select);
    return [+user.stats[indexOf]];
  };

  useEffect(() => {
    axiosPrivate
      .get("stats/leaderboards")
      .then((res: AxiosResponse) => {
        setData(res.data);
      })
      .catch((err: AxiosError) => {
        setErrMsg("Error while loading stats");
      });
  }, []);

  const renderRow = () => {
    if (asc == true)
      data.sort((a, b) => (getCategory(a) < getCategory(b) ? 1 : -1));
    else data.sort((a, b) => (getCategory(a) > getCategory(b) ? 1 : -1));

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
              <TableData
                onClick={() => {
                  setAsc(!asc);
                  setSelect(stat);
                }}
                key={nanoid()}
                style={{ cursor: "pointer" }}>
                <h4>{stat}</h4>
                {stat == select ? (
                  asc == true ? (
                    <IoMdArrowDropup
                      style={{ cursor: "pointer" }}
                      color={COLORS.primary}
                      size={22}
                    />
                  ) : (
                    <IoMdArrowDropdown
                      style={{ cursor: "pointer" }}
                      color={COLORS.primary}
                      size={22}
                    />
                  )
                ) : (
                  <></>
                )}
              </TableData>
            );
          })}
        </TableRow>
      </MediaQuery>
      <MediaQuery maxWidth={mediaSize.laptop - 1}>
        <TableRow>
          <TableData>
            <ShopTopBarSelect
              value={select}
              onChange={(e) => setSelect(e.target.value)}>
              {stats.map((stat) => {
                return <option key={nanoid()}>{stat}</option>;
              })}
            </ShopTopBarSelect>
          </TableData>
        </TableRow>
      </MediaQuery>
      <RankingBody>{renderRow()}</RankingBody>
      {errMsg.length > 0 ? <p style={{ color: "red" }}>{errMsg}</p> : <></>}
    </RankingTable>
  );
}

export default Ranking;
