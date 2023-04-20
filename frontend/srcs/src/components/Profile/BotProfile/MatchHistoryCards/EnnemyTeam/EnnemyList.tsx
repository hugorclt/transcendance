import { MatchHistoryProps } from "../MatchHistory";

export function EnnemyList({result, score, ally, ennemy, mode}: MatchHistoryProps) {
    return (
        <div>{ennemy.map((el) => (<div>{el}</div>))}</div>
    );
}