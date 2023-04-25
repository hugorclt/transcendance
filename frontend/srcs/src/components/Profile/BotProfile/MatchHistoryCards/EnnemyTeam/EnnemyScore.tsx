import { EnnemyTeamProps, MatchHistoryProps } from "../MatchHistory";

export function EnnemyScore({ennemyScore, ennemy}: EnnemyTeamProps) {
    return (
        <h4>{ennemyScore}</h4>
    );
}