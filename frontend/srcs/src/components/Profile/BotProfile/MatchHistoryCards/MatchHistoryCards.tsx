import React from "react";
import { COLORS } from "../../../../colors";
import { AllyTeam } from "./AllyTeam/AllyTeam";
import { EnnemyTeam } from "./EnnemyTeam/EnnemyTeam";
import { MatchHistoryProps } from "./MatchHistory";
import { MatchHistoryContainer2 } from "./MatchHistoryCardStyle";
import { AllyInfoContainer,
        EnnemyInfoContainer,
        ResultContainer} from "./MatchHistoryCardStyle";

export function MatchHistoryCards({result, score, ally, ennemy, mode}: MatchHistoryProps) {
    return (
       <MatchHistoryContainer2>
        <ResultContainer>
            <h5>{result}</h5>
        </ResultContainer>
        <AllyInfoContainer>
            <AllyTeam
            result={result}
            score={score}
            ally={ally}
            ennemy={ennemy}
            mode={mode}
            />
        </AllyInfoContainer>
        <EnnemyInfoContainer>
            <EnnemyTeam
            result={result}
            score={score}
            ally={ally}
            ennemy={ennemy}
            mode={mode}/>
        </EnnemyInfoContainer>
        </MatchHistoryContainer2>
    );
}