import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ManagerRoomDto {
  @ApiProperty()
  @IsUUID()
  targetId: string;

  @ApiProperty()
  @IsUUID()
  roomId: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isMute?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  time?: number;
}
