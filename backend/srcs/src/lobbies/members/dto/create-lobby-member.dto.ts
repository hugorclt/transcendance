import { ApiProperty } from '@nestjs/swagger';
import { Team } from '@prisma/client';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateLobbyMemberDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  team: Team;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  ready: boolean;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty()
  lobbyId: string;
}
