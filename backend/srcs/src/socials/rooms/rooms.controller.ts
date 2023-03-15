import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoomEntity } from './entities/room.entity';
import { AccessAuthGard } from 'src/auth/utils/guards';
import { SocialsGateway } from '../socials.gateway';

@Controller('rooms')
@ApiTags('rooms')
@UseGuards(AccessAuthGard)
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private socialGateway: SocialsGateway,
  ) {}

  @Post('/create')
  @ApiCreatedResponse({ type: RoomEntity })
  async create(@Request() req, @Body() createRoomDto: CreateRoomDto) {
    const creatorId = req.user.sub;
    createRoomDto.ownerId = creatorId;
    const room = await this.roomsService.create(createRoomDto);
    this.socialGateway.addChatToHistory(room.ownerId, room.name, "", room.avatar, room.id);
    this.socialGateway.joinUserToRoom(room, createRoomDto.users);
    return { roomId: room.id };
  }

  @Get('/history')
  @ApiCreatedResponse({ type: [RoomEntity] })
  async findHistory(@Request() req) {
    const roomsHistory = await this.roomsService.findHistory(req.user.sub);
    return (roomsHistory);
  }

  @Post('conv/history')
  async getHistoryRoom(@Request() req) {
    return await this.roomsService.findConvHistory(req.body.roomName)
  }

  @Post("/participants")
  async getParticipantsInRoom(@Request() req) {
    const test = await this.roomsService.getParticipantsInRoom(req.body.roomName);
    return (test);
  }
}
