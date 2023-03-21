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
import { MessagesService } from './messages/messages.service';

@Controller('rooms')
@ApiTags('rooms')
@UseGuards(AccessAuthGard)
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private socialGateway: SocialsGateway,
    private messageService: MessagesService,
  ) {}

  @Post('/create')
  @ApiCreatedResponse({ type: RoomEntity })
  async create(@Request() req, @Body() createRoomDto: CreateRoomDto) {
    const creatorId = req.user.sub;
    createRoomDto.ownerId = creatorId;
    const room = await this.roomsService.create(createRoomDto);
    this.socialGateway.addChatToHistory(creatorId, room, {
      content: '',
      senderId: undefined,
      roomId: undefined,
      id: undefined,
      date: undefined,
    });
    this.socialGateway.joinUserToRoom(
      room,
      createRoomDto.users.map((user) => user.username),
    );
    return { roomId: room.id };
  }

  @Get('/history')
  @ApiCreatedResponse({ type: [RoomEntity] })
  async findHistory(@Request() req) {
    const roomsHistory = await this.roomsService.findHistory(req.user.sub);
    return roomsHistory;
  }

  @Post('conv/history')
  async getHistoryRoom(@Request() req) {
    return await this.roomsService.findConvHistory(req.body.roomName);
  }

  @Post('/participants')
  async getParticipantsInRoom(@Request() req) {
    const test = await this.roomsService.getParticipantsInRoom(
      req.body.roomName,
    );
    return test;
  }

  @Post('/leave')
  async leaveRoom(@Request() req) {
    const { room, participant} = await this.roomsService.leaveRoom(
      req.body.userId,
      req.body.roomId,
    );
    participant.map((user) => {
      const dataToSend = (user.userId == req.body.userId ? {id: req.body.roomId, avatar: "deleted"} : room)
      this.socialGateway.emitToUser(user.userId, "on-chat-update", dataToSend);
    })
  }
}
