import { Game } from 'src/game/resources/Game/Game';
import { Player } from 'src/game/resources/Player/Player';

export class LobbyEventEntity {
  lobbyId: string;

  player: Player;

  game: Game;
}
