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

  // @Post()
  // @ApiCreatedResponse({ type: RoomEntity })
  // create(@Body() createRoomDto: CreateRoomDto) {
  //   return this.roomsService.create(createRoomDto);
  // }

  @Post('/create')
  @ApiCreatedResponse({ type: RoomEntity })
  create(
    @Request() req,
    @Body() CreateRoomDto: CreateRoomDto,
  ) {
    const creatorId = req.user.sub;
    CreateRoomDto.creatorId = creatorId;
    console.log(req);
    // console.log(creatorId);
    console.log("DTO, room creation :", CreateRoomDto);
    return this.roomsService.create(CreateRoomDto);
  }
  



  @Get()
  @ApiOkResponse({ type: RoomEntity, isArray: true})
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: RoomEntity })
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  // @Patch(':id')
  // @ApiOkResponse({ type: RoomEntity })
  // update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
  //   return this.roomsService.update(id, updateRoomDto);
  // }

  @Delete(':id')
  @ApiOkResponse({ type: RoomEntity })
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
