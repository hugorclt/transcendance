import { ApiProperty } from '@nestjs/swagger';
import { EMap, EMode } from '@prisma/client';
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
  @IsOptional()
  private: boolean;

  @ApiProperty()
  @IsNotEmpty()
  mode: EMode;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  map: EMap;
}
