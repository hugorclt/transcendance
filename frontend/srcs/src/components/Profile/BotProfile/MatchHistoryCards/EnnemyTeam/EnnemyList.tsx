import { EnnemyTeamProps, MatchHistoryProps } from "../MatchHistory";
import { nanoid } from "nanoid";

export function EnnemyList({ ennemyScore, ennemy }: EnnemyTeamProps) {
  return (
    <div>
      {ennemy.map((el) => (
        <div key={nanoid()}>{el.username}</div>
      ))}
    </div>
  );
}
