import { AllyTeam } from "./AllyTeam/AllyTeam";
import { EnnemyTeam } from "./EnnemyTeam/EnnemyTeam";
import { MatchHistoryProps } from "./MatchHistory";
import { MatchHistoryContainer2 } from "./MatchHistoryCardStyle";
import {
  AllyInfoContainer,
  EnnemyInfoContainer,
  ResultContainer,
} from "./MatchHistoryCardStyle";

export function MatchHistoryCard({
  result,
  allyScore,
  ally,
  ennemyScore,
  ennemy,
  mode,
}: MatchHistoryProps) {
  return (
    <MatchHistoryContainer2>
      <ResultContainer>
        <h5>{result}</h5>
      </ResultContainer>
      <AllyInfoContainer>
        <AllyTeam
          allyScore={allyScore}
          ally={ally}
        />
      </AllyInfoContainer>
      <EnnemyInfoContainer>
        <EnnemyTeam
          ennemyScore={ennemyScore}
          ennemy={ennemy}
        />
      </EnnemyInfoContainer>
    </MatchHistoryContainer2>
  );
}
