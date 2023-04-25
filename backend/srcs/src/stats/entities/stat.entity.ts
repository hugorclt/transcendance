import { Stat, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class StatEntity implements Stat {
  @ApiProperty()
  id: string;

  @ApiProperty()
  xp: number;

  @ApiProperty()
  lvl: number;

  @ApiProperty()
  nbGame: number;

  @ApiProperty()
  nbWin: number;

  @ApiProperty()
  user: User;

  @ApiProperty()
  userId: string;
}
