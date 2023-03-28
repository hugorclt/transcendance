import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class ManagerRoomDto {
  @ApiProperty()
  @IsUUID()
  targetId: string;

  @ApiProperty()
  @IsUUID()
  roomId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  isMute?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  time?: string;
}
