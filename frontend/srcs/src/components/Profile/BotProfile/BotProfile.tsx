import { BotProfileContainer, FirstCardContainer } from "./BotProfileStyle.js";
import { MatchHistoryCard } from "./MatchHistoryCards/MatchHistoryCard.js";
import { FirstCard } from "./MatchHistoryCards/FirstCard.js";
import { nanoid } from "nanoid";
import { matchAtom, userAtom } from "../../../services/store.js";
import { TMatch, TUser } from "../../../services/type.js";
import { useAtom } from "jotai";
import { axiosPrivate } from "../../../services/axios.js";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";

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

  const getAlly = (match: TMatch): TUser[] => {
    if (getResult(match) == "DEFEAT") return match.losers;
    return match.winners;
  }

  const getAllyScore = (match: TMatch): number => {
    if (getResult(match) == "DEFEAT") return match.loserScore;
    return match.winnerScore;
  }

  const getEnnemy = (match: TMatch): TUser[] => {
    if (getResult(match) == "DEFEAT") return match.winners;
    return match.losers;
  }

  const getEnnemyScore = (match: TMatch): number => {
    if (getResult(match) == "DEFEAT") return match.winnerScore;
    return match.loserScore;
  }

  return match.map((match) => {
    return (
      <MatchHistoryCard
        key={nanoid()}
        result={getResult(match)}
        allyScore={getAllyScore(match)}
        ally={getAlly(match)}
        ennemyScore={getEnnemyScore(match)}
        ennemy={getEnnemy(match)}
        mode="CLASSIC"
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
