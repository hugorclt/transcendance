import { LobbyMember, PaddleType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class LobbyMemberEntity implements LobbyMember {
  @ApiProperty()
  id: string;

  @ApiProperty({ default: false })
  team: boolean = false;

  @ApiProperty({ default: false })
  ready: boolean = false;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  lobbyId: string;

  @ApiProperty()
  paddleType: PaddleType;
}
