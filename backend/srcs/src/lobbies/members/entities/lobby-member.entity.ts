import { LobbyMember, Team } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class LobbyMemberEntity implements LobbyMember {
  @ApiProperty()
  id: string;

  @ApiProperty({ default: Team.LEFT })
  team: Team = Team.LEFT;

  @ApiProperty({ default: false })
  ready: boolean = false;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  lobbyId: string;
}
