import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Request, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoomEntity } from './entities/room.entity';
import { AccessAuthGard } from 'src/auth/utils/guards';

@Controller('rooms')
@ApiTags('rooms')
@UseGuards(AccessAuthGard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('/create')
  @ApiCreatedResponse({ type: RoomEntity })
  create(
    @Request() req,
    @Body() CreateRoomDto: CreateRoomDto,
  ) {
    const creatorId = req.user.sub;
    CreateRoomDto.ownerId = creatorId;
    console.log("DTO, room creation :", CreateRoomDto);
    return this.roomsService.create(CreateRoomDto);
  }

  @Get("/history")
  @ApiCreatedResponse({ type: [RoomEntity] })
  findHistory(@Request() req) {
    return this.roomsService.findHistory(req.user.sub);
  }
}
