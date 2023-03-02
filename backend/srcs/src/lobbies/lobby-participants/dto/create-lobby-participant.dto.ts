import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLobbyParticipantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lobbyId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}
