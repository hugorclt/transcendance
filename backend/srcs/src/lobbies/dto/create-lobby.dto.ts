import { ApiProperty } from '@nestjs/swagger';
import { User, Mode, MapName } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class CreateLobbyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(4)
  nbPlayers: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(60)
  maxDuration: number;

  @ApiProperty()
  @IsNotEmpty()
  mode: Mode;

  @ApiProperty()
  @IsNotEmpty()
  map: MapName;
}
