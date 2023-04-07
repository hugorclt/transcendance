import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateMessageDto {
    @ApiProperty()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsOptional()
    senderId: string;
    
    @ApiProperty()
    @IsNotEmpty()
    roomId: string;

}
