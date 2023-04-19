import { ApiProperty } from '@nestjs/swagger';
import { EItem, Item } from '@prisma/client';

export class ItemEntity implements Item {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  type: EItem;
}
