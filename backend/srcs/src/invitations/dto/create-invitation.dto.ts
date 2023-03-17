import { ApiProperty } from '@nestjs/swagger';
import { InvitationType } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInvitationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: InvitationType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsOptional()
  lobbyId: string;
}
