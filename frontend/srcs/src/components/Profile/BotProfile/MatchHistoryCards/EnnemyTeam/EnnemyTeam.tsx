import { MatchHistoryProps } from "../MatchHistory";
import { EnnemyList } from "./EnnemyList";
import { EnnemyScore } from "./EnnemyScore";
import { EnnemyListContainer, EnnemyTeamContainer } from "./EnnemyTeamStyle";
import { EnnemyScoreContainer } from "./EnnemyTeamStyle";

export function EnnemyTeam({result, score, ally, ennemy, mode}: MatchHistoryProps) {
    return (
        <EnnemyTeamContainer>
            <EnnemyScoreContainer>
            <EnnemyScore
            result={result}
            score={score}
            ally={ally}
            ennemy={ennemy}
            mode={mode}/>
            </EnnemyScoreContainer>
            <EnnemyListContainer>
            <EnnemyList
            result={result}
            score={score}
            ally={ally}
            ennemy={ennemy}
            mode={mode}/>
            </EnnemyListContainer>
        </EnnemyTeamContainer>
    );
}