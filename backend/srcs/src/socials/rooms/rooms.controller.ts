import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoomEntity } from './entities/room.entity';
import { AccessAuthGard } from 'src/auth/utils/guards';
import { SocialsGateway } from '../socials.gateway';

@Controller('rooms')
@ApiTags('rooms')
@UseGuards(AccessAuthGard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('/create')
  @ApiCreatedResponse({ type: RoomEntity })
  async create(@Request() req, @Body() createRoomDto: CreateRoomDto) {
    const creatorId = req.user.sub;
    createRoomDto.ownerId = creatorId;
    const room = await this.roomsService.create(createRoomDto);
    return {roomId: room.id}
  }

  @Get('/history')
  @ApiCreatedResponse({ type: [RoomEntity] })
  async findHistory(@Request() req) {
    return await this.roomsService.findHistory(req.user.sub);
  }
}
