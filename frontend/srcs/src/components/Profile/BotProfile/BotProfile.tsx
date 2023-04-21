import { BotProfileContainer, FirstCardContainer } from "./BotProfileStyle.js";
import { MatchHistoryCard } from "./MatchHistoryCards/MatchHistoryCard.js";
import { FirstCard } from "./MatchHistoryCards/FirstCard.js";
import { nanoid } from "nanoid";
import { matchAtom, userAtom } from "../../../services/store.js";
import { TMatch } from "../../../services/type.js";
import { useAtom } from "jotai";
import { axiosPrivate } from "../../../services/axios.js";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";

const data = [
  {
    result: "VICTORY",
    score: ["8", "2"],
    ally: ["Ryad", "Dylan"],
    ennemy: ["Hugo", "Doume"],
    mode: "CLASSIC",
  },
  {
    result: "DEFEAT",
    score: ["1", "3"],
    ally: ["Ryad"],
    ennemy: ["Hugo"],
    mode: "CLASSIC",
  },
  {
    result: "DEFEAT",
    score: ["4", "7"],
    ally: ["Ryad", "Hugo"],
    ennemy: ["Dylan", "Doume"],
    mode: "CHAMPIONS",
  },
  {
    result: "VICTORY",
    score: ["5", "4"],
    ally: ["Ryad"],
    ennemy: ["Doume"],
    mode: "CHAMPIONS",
  },
];

const renderCards = () => {
  const [match, setMatch] = useState<TMatch[]>([]);
  const [user, setuser] = useAtom(userAtom);

  useEffect(() => {
    axiosPrivate
      .get("/matches")
      .then((response) => {
        setMatch(response.data);
      })
      .catch((error) => {
        console.error("This is not really sympathique");
      });
  }, []);

  const getResult = (match: TMatch): string => {
    if (match.losers.find((loser) => user.id == loser.id)) return "DEFEAT";
    return "VICTORY";
  };

  return data.map((match) => {
    return (
      <MatchHistoryCard
        key={nanoid()}
        result={match.result}
        score={match.score}
        ally={match.ally}
        ennemy={match.ennemy}
        mode={match.mode}
      />
    );
  });
};

export function BotProfile() {
  return (
    <BotProfileContainer>
      <FirstCardContainer>
        <h2>Match History</h2>
      </FirstCardContainer>
      <FirstCard />
      {renderCards()}
    </BotProfileContainer>
  );
}
