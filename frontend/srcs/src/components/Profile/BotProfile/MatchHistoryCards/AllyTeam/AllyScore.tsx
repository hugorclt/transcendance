import { MatchHistoryProps } from "../MatchHistory";

export function AllyScore({result, score, ally, ennemy, mode}: MatchHistoryProps) {
    return (
        <h4>{score[0]}</h4>
    );
}