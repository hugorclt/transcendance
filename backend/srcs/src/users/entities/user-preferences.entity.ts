import { ApiProperty } from '@nestjs/swagger';
import { Status, VisibilityMode } from '@prisma/client';

export class UserPreferencesEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  visibility: VisibilityMode;
}
