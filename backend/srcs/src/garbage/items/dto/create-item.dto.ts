import { ApiProperty } from "@nestjs/swagger";

export class CreateItemDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    image: string;
}
