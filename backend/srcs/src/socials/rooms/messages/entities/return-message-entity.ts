import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class ReturnMessageEntity {
    @ApiProperty()
    @IsOptional()
    @IsString()
    content?: string;

    @ApiProperty()
    @IsOptional()
    @IsUUID()
    senderId?: string;

    @ApiProperty()
    @IsOptional()
    @IsUUID()
    roomId?: string;

    @ApiProperty()
    @IsBoolean()
    isMuted: boolean;
}