import { Lobby } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Mode, MapName } from '@prisma/client';

export class LobbyEntity implements Lobby {
  @ApiProperty()
  id: string;

  @ApiProperty()
  ownerId: string;

  @ApiProperty({ default: 2 })
  nbPlayers: number = 2;

  @ApiProperty({ default: 180 })
  maxDuration: number = 180;

  @ApiProperty({ default: Mode.CLASSIC })
  mode: Mode = Mode.CLASSIC;

  @ApiProperty({ default: false })
  private: boolean = false;

  @ApiProperty({ default: MapName.CLASSIC })
  map: MapName = MapName.CLASSIC;
}
