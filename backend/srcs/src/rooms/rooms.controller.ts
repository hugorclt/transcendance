import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
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
  create(@Request() req) {
    return this.roomsService.create(req);
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

  @Patch(':id')
  @ApiOkResponse({ type: RoomEntity })
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: RoomEntity })
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
