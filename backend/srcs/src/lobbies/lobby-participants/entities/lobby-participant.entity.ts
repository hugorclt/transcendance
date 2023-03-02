import { ApiProperty } from '@nestjs/swagger';
import { LobbyParticipant } from '@prisma/client';

export class LobbyParticipantEntity implements LobbyParticipant {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  lobbyId: string;
}
