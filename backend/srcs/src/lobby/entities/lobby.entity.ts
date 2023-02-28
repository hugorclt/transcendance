import { Lobby } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Mode } from '@prisma/client';

export class LobbyEntity implements Lobby {
  @ApiProperty()
  id: string;

  @ApiProperty({ default: Mode.CLASSIC })
  mode: Mode;

  @ApiProperty()
  ownerId: string;
}
