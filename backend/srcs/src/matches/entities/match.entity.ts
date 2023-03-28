import { Match, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MatchEntity implements Match {
  @ApiProperty()
  id: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  duration: Date;

  @ApiProperty()
  winnerScore: number;

  @ApiProperty()
  winners: User[];

  @ApiProperty()
  loserScore: number;

  @ApiProperty()
  losers: User[];
}
