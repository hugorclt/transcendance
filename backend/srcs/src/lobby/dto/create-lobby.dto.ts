import { ApiProperty } from '@nestjs/swagger';
import { Mode } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLobbyDto {
  @ApiProperty()
  mode: Mode;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ownerID: string;
}
