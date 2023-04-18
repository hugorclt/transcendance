import { EMap, EMode, Lobby, LobbyMember, LobbyState } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class LobbyEntity implements Lobby {
  @ApiProperty()
  id: string;

  @ApiProperty()
  ownerId: string;

  @ApiProperty({ default: 2 })
  nbPlayers: number = 2;

  @ApiProperty({ default: 180 })
  maxDuration: number = 180;

  @ApiProperty({ default: EMode.CLASSIC })
  mode: EMode = EMode.CLASSIC;

  @ApiProperty({ default: false })
  private: boolean = false;

  @ApiProperty({ default: EMap.CLASSIC })
  map: EMap = EMap.CLASSIC;

  @ApiProperty()
  state: LobbyState;
}

export class LobbyWithMembersEntity extends LobbyEntity {
  @ApiProperty()
  members: LobbyMember[];
}
