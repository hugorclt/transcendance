import { AllyTeamProps, MatchHistoryProps } from "../MatchHistory";
import { nanoid } from "nanoid";

export function AllyList({ allyScore, ally }: AllyTeamProps) {
  return (
    <div>
      {ally.map((el) => (
        <div key={nanoid()}>{el.username}</div>
      ))}
    </div>
  );
}
