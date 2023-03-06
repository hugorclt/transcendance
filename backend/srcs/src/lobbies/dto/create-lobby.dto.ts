import { ApiProperty } from '@nestjs/swagger';
import { Mode, MapName } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateLobbyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(4)
  nbPlayers: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(60)
  maxDuration: number;

  @ApiProperty()
  @IsNotEmpty()
  mode: Mode;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  map: MapName;
}
