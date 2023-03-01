import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateMessageDto {
    @ApiProperty()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsNotEmpty()
    senderId: string;
    
    @ApiProperty()
    @IsNotEmpty()
    roomId: string;

}
