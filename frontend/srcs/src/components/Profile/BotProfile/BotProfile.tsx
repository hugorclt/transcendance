import { BotProfileContainer, FirstCardContainer } from "./BotProfileStyle.js";
import { MatchHistoryCard } from "./MatchHistoryCards/MatchHistoryCard.js";
import { FirstCard } from "./MatchHistoryCards/FirstCard.js";
import { nanoid } from "nanoid";
import { userAtom } from "../../../services/store.js";
import { TMatch, TUser } from "../../../services/type.js";
import { useAtom } from "jotai";
import { axiosPrivate } from "../../../services/axios.js";
import { useEffect, useState } from "react";

const renderCards = (user_id: string) => {
  const [match, setMatch] = useState<TMatch[]>([]);
  const [user, setuser] = useAtom(userAtom);

  type matchDataType = {
    result: string;
    allyScore: number;
    ally: TUser[];
    ennemyScore: number;
    ennemy: TUser[];
    mode: string;
  };

  let matchData: matchDataType = {
    result: "",
    allyScore: 0,
    ally: [],
    ennemyScore: 0,
    ennemy: [],
    mode: "",
  };

  useEffect(() => {
    axiosPrivate
      .get(`/matches/user/${user_id}`)
      .then((response) => {
        setMatch(response.data);
      })
      .catch((error) => {
        console.error("Oh lala je ne trouve pas les match cote backend");
      });
  }, [user_id]);

  const getMatch = (match: TMatch, matchData: matchDataType): matchDataType => {
    if (match.losers.find((loser) => user.id == loser.id)) {
      matchData.result = "DEFEAT";
      matchData.allyScore = match.loserScore;
      matchData.ally = match.losers;
      matchData.ennemyScore = match.winnerScore;
      matchData.ennemy = match.winners;
      matchData.mode = "";
    } else {
      matchData.result = "VICTORY";
      matchData.allyScore = match.winnerScore;
      matchData.ally = match.winners;
      matchData.ennemyScore = match.loserScore;
      matchData.ennemy = match.losers;
      matchData.mode = "";
    }
    return matchData;
  };

  return match.map((match) => {
    matchData = getMatch(match, matchData);
    return (
      <MatchHistoryCard
        key={nanoid()}
        result={matchData.result}
        allyScore={matchData.allyScore}
        ally={matchData.ally}
        ennemyScore={matchData.ennemyScore}
        ennemy={matchData.ennemy}
        mode={matchData.mode}
      />
    );
  });
};

export function BotProfile({ user_id }) {
  return (
    <BotProfileContainer>
      <FirstCardContainer>
        <h2>Match History</h2>
      </FirstCardContainer>
      <FirstCard />
      <div style={{ width: "100%", flexGrow: "1", overflowY: "auto" }}>
        {renderCards(user_id)}
      </div>
    </BotProfileContainer>
  );
}
