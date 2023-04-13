import { ApiProperty } from "@nestjs/swagger";
import { Item, ItemType } from "@prisma/client";

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
    type: ItemType;
}
