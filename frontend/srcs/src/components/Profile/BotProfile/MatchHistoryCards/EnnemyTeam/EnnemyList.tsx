import { EnnemyTeamProps, MatchHistoryProps } from "../MatchHistory";

export function EnnemyList({ennemyScore, ennemy}: EnnemyTeamProps) {
    return (
        <div>{ennemy.map((el) => (<div>{el.username}</div>))}</div>
    );
}