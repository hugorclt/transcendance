import { MatchHistoryProps } from "../MatchHistory";

export function EnnemyScore({result, score, ally, ennemy, mode}: MatchHistoryProps) {
    return (
        <h4>{score[1]}</h4>
    );
}