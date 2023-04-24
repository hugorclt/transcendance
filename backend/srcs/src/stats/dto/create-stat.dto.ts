import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStatDto {
  @ApiProperty()
  @IsNumber()
  xp: number;

  @ApiProperty()
  @IsNumber()
  lvl: number;

  @ApiProperty()
  @IsNumber()
  nbGame: number;

  @ApiProperty()
  @IsNumber()
  nbWin: number;

  @ApiProperty()
  @IsNotEmpty()
  user: string;
}
