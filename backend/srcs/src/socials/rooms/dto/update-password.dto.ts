import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordDto {
  @ApiProperty()
  roomId: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirm: string;
}
