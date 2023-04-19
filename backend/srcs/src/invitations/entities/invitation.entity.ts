import { ApiProperty } from '@nestjs/swagger';
import { Invitation, InvitationType } from '@prisma/client';

export class InvitationEntity implements Invitation {
  @ApiProperty()
  id: string;

  @ApiProperty()
  isRead: boolean;

  @ApiProperty()
  type: InvitationType;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  userFromId: string;

  @ApiProperty()
  lobbyId: string;
}

export class InvitationExtendedEntity extends InvitationEntity {
  @ApiProperty()
  userFromUsername: string;
}
