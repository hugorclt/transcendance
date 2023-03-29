import { ApiProperty } from '@nestjs/swagger';
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
  team: boolean;

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
