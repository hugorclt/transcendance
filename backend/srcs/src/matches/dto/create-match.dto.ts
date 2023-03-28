import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMatchDto {
  @ApiProperty()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  duration: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  winnerScore: number;

  @ApiProperty()
  @IsNotEmpty()
  winners: string[];

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  loserScore: number;

  @ApiProperty()
  @IsNotEmpty()
  losers: string[];
}
