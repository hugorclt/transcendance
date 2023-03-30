import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class KickLobbyMemberDto {
  @IsString()
  @IsUUID()
  @ApiProperty()
  lobbyId: string;

  @IsString()
  @IsUUID()
  @ApiProperty()
  playerId: string;
}
