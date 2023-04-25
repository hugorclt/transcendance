import { EnnemyTeamProps, MatchHistoryProps } from "../MatchHistory";
import { EnnemyList } from "./EnnemyList";
import { EnnemyScore } from "./EnnemyScore";
import { EnnemyListContainer, EnnemyTeamContainer } from "./EnnemyTeamStyle";
import { EnnemyScoreContainer } from "./EnnemyTeamStyle";

export function EnnemyTeam({ennemyScore, ennemy}: EnnemyTeamProps) {
    return (
        <EnnemyTeamContainer>
            <EnnemyScoreContainer>
            <EnnemyScore
            ennemyScore={ennemyScore}
            ennemy={ennemy}/>
            </EnnemyScoreContainer>
            <EnnemyListContainer>
            <EnnemyList
            ennemyScore={ennemyScore}
            ennemy={ennemy}/>
            </EnnemyListContainer>
        </EnnemyTeamContainer>
    );
}