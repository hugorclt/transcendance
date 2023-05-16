import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { ReturnRoomEntity, RoomEntity } from './entities/room.entity';
import { AccessAuthGard } from 'src/auth/utils/guards';
import { JoinRoomDto } from './dto/join-room-dto';
import { ReturnMessageEntity } from './messages/entities/return-message-entity';
import { CreateMessageDto } from './messages/dto/create-message.dto';
import { ManagerRoomDto } from './dto/manager-room-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('rooms')
@UseGuards(AccessAuthGard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('/create')
  async create(
    @Request() req,
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<ReturnRoomEntity> {
    return await this.roomsService.create(req.user.sub, createRoomDto);
  }

  @Get('/history')
  async findHistory(@Request() req): Promise<ReturnRoomEntity[]> {
    return await this.roomsService.findHistory(req.user.sub);
  }

  @Get('/history/:id')
  async getHistoryRoom(
    @Request() req,
    @Param('id') roomId: string,
  ): Promise<ReturnMessageEntity[]> {
    return await this.roomsService.findConvHistory(req.user.sub, roomId);
  }

  @Post('/join')
  async JoinRoom(
    @Request() req,
    @Body() joinRoomDto: JoinRoomDto,
  ): Promise<ReturnRoomEntity> {
    return await this.roomsService.joinRoom(req.user.sub, joinRoomDto);
  }

  @Get('/leave/:id')
  async leaveRoom(
    @Request() req,
    @Param('id') roomId: string,
  ): Promise<string> {
    await this.roomsService.leaveRoom(req.user.sub, roomId);
    return 'deleted';
  }

  @Post('/message')
  async newMessage(@Request() req, @Body() newMessage: CreateMessageDto) {
    return await this.roomsService.newMessage(req.user.sub, newMessage);
  }

  @Post('/kick')
  async kickFromRoom(
    @Request() req,
    @Body() managerRoomDto: ManagerRoomDto,
  ): Promise<string> {
    await this.roomsService.kickFromRoom(req.user.sub, managerRoomDto);
    return 'success';
  }

  @Post('/mute')
  async muteFromRoom(
    @Request() req,
    @Body() managerRoomDto: ManagerRoomDto,
  ): Promise<string> {
    await this.roomsService.muteFromRoom(req.user.sub, managerRoomDto);
    return 'success';
  }

  @Post('/ban')
  async banFromRoom(
    @Request() req,
    @Body() managerRoomDto: ManagerRoomDto,
  ): Promise<string> {
    await this.roomsService.banFromRoom(req.user.sub, managerRoomDto);
    return 'success';
  }

  @Post('/unban')
  async unbanFromRoom(@Request() req) {
    return await this.roomsService.unbanFromRoom(
      req.user.sub,
      req.body.roomId,
      req.body.bannedName,
    );
  }

  @Post('/update-name')
  async updateName(@Request() req) {
    return await this.roomsService.updateRoomName(
      req.user.sub,
      req.body.newName,
      req.body.roomId,
    );
  }

  @Post('update-picture')
  @UseInterceptors(FileInterceptor('picture'))
  async uploadFile(@Request() req, @UploadedFile() file: Express.Multer.File) {
    return await this.roomsService.updatePhoto(
      req.user.sub,
      file.originalname,
      file.buffer,
    );
  }

  @Post('update-password')
  async updatePassword(
    @Request() req,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.roomsService.updatePassword(
      req.user.sub,
      updatePasswordDto,
    );
  }

  @Post('set-admin')
  async setAdmin(@Request() req, @Body() body) {
    return await this.roomsService.setAdmin(
      req.user.sub,
      req.body.roomId,
      req.body.targetId,
    )
  }
}
