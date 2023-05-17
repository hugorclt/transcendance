import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import bcrypt from 'bcrypt';
import { ParticipantService } from './participant/participant.service';
import { Message, Participant, Role, Room, User } from '@prisma/client';
import { MessagesService } from './messages/messages.service';
import { SocialsGateway } from '../socials.gateway';
import { ReturnRoomEntity } from './entities/room.entity';
import { JoinRoomDto } from './dto/join-room-dto';
import { ReturnMessageEntity } from './messages/entities/return-message-entity';
import { CreateMessageDto } from './messages/dto/create-message.dto';
import { ManagerRoomDto } from './dto/manager-room-dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { defaultAvatar } from '../../utils/base64';

@Injectable()
export class RoomsService {
  constructor(
    private prisma: PrismaService,
    private participantService: ParticipantService,
    private messageService: MessagesService,
    private socialGateway: SocialsGateway,
  ) {}

  async create(
    ownerId: string,
    createRoomDto: CreateRoomDto,
  ): Promise<ReturnRoomEntity> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createRoomDto.password, salt);

    createRoomDto.users.push({ userId: ownerId, role: 'OWNER' });
    if (createRoomDto.isDm == true) {
      const concatenatedID = this.concatenateID(
        createRoomDto.users[0].userId,
        createRoomDto.users[1].userId,
      );

      const roomExists = await this.prisma.room.findUnique({
        where: {
          name: concatenatedID,
        },
      });
      if (roomExists !== null) throw new ConflictException();
      createRoomDto.name = concatenatedID;
    }

    const room = await this.prisma.room.create({
      data: {
        name: createRoomDto.name,
        password: hash,
        avatar: defaultAvatar.group,
        isPrivate: createRoomDto.isPrivate,
        isDm: createRoomDto.isDm,
        type: 0,
        participants: {
          create: createRoomDto.users.map((user) => ({
            user: { connect: { id: user.userId } },
            role: user.role as Role,
          })),
        },
        owner: { connect: { id: ownerId } },
      },
      include: {
        participants: true,
        owner: true,
        banned: true,
      },
    });

    const roomEntity = await this.createRoomReturnEntity(room, undefined);

    await this.socialGateway.joinUsersToRoom(
      room,
      createRoomDto.users.map((user) => user.userId),
    );
    this.socialGateway.emitRoomCreated(ownerId, roomEntity);
    return roomEntity;
  }

  async findHistory(userId: string): Promise<ReturnRoomEntity[]> {
    const list = await this.findRoomsForUser(userId);

    return await Promise.all(
      list.flatMap(async (room) => {
        const lastMessage = await this.messageService.getLastMessage(room.id);

        if (room.ownerId != userId && lastMessage == null) return;
        return this.createRoomReturnEntity(room, lastMessage);
      }),
    );
  }

  async findConvHistory(
    userId: string,
    roomId,
  ): Promise<ReturnMessageEntity[]> {
    const room = await this.findUserInRoom(roomId, { userId });
    if (!room) throw new NotFoundException();

    const messages = await this.messageService.getMessages(room.id);
    const ret = await Promise.all(
      messages.flatMap(async (message) => {
        if (await this.checkIfUserBlocked(userId, message.senderId)) {
          return;
        }
        return {
          content: message.content,
          senderId: message.senderId,
          roomId: message.roomId,
          isMuted: false,
        };
      }),
    );
    return ret.filter((message) => message != null);
  }

  async checkIfUserBlocked(userId: string, userBlockedId: string) {
    const userTo = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        isBloqued: true,
      },
    });
    const isBloqued = userTo.isBloqued.some(
      (blocked) => blocked.id == userBlockedId,
    );
    if (isBloqued) return true;
    return false;
  }

  async joinRoom(
    userId: string,
    joinRoomDto: JoinRoomDto,
  ): Promise<ReturnRoomEntity> {
    const room = await this.findOneByName(joinRoomDto.name);
    if (!room) throw new NotFoundException();
    const isAlreadyIn = room.participants.find((user) => user.userId == userId);
    if (isAlreadyIn) throw new UnprocessableEntityException();
    const isBanned = room.banned.find((user) => user.id == userId);
    if (isBanned) throw new ConflictException();
    const checkPassword = await bcrypt.compare(
      joinRoomDto.password,
      room.password,
    );
    if (!checkPassword) throw new ForbiddenException();
    const newRoom = await this.prisma.room.update({
      where: {
        id: room.id,
      },
      data: {
        participants: {
          create: {
            userId: userId,
            role: Role.BASIC,
          },
        },
      },
      include: {
        participants: true,
        banned: true,
      },
    });
    this.socialGateway.emitToUser(room.id, 'on-chat-update', {
      id: room.id,
      participants: await this.participantService.createParticipantFromRoom(
        newRoom,
      ),
    });
    this.socialGateway.joinUserToRoom(room.id, userId);
    return this.createRoomReturnEntity(
      newRoom,
      await this.messageService.getLastMessage(newRoom.id),
    );
  }

  async leaveRoom(userId: string, roomId: string) {
    const oldRoom = await this.findOne(roomId);
    if (!oldRoom) throw new NotFoundException();
    var nbParticipant = oldRoom.participants.length;
    const participantToDel = await this.prisma.participant.findFirst({
      where: {
        userId: userId,
        roomId: roomId,
      },
    });
    if (!participantToDel) throw new NotFoundException();
    await this.prisma.participant.delete({
      where: {
        id: participantToDel.id,
      },
    });

    nbParticipant -= 1;
    if (nbParticipant != 0 && participantToDel.role == Role.OWNER) {
      this.changeOwner(roomId);
    }

    const newRoom = await this.prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        roomMsg: {
          deleteMany: {
            senderId: userId,
          },
        },
      },
      include: {
        participants: true,
      },
    });

    if (nbParticipant == 0 || newRoom.isDm == true) {
      if (newRoom.isDm == true) {
        this.socialGateway.emitToUser(newRoom.id, 'on-chat-delete', {
          roomId: newRoom.id,
        });
        await this.socialGateway.leaveUserFromRoom(
          roomId,
          newRoom.participants[0].userId,
        );
        await this.prisma.participant.deleteMany({
          where: {
            roomId: roomId,
          },
        });
      }
      await this.prisma.room.delete({
        where: { id: roomId },
      });
    }

    this.socialGateway.leaveUserFromRoom(roomId, userId);
    if (newRoom)
      this.socialGateway.emitToUser(newRoom.id, 'on-chat-update', {
        id: newRoom.id,
        participants: await this.participantService.createParticipantFromRoom(
          newRoom,
        ),
      });
    return newRoom;
  }

  async newMessage(
    senderId: string,
    newMessage: CreateMessageDto,
  ): Promise<ReturnMessageEntity> {
    if (newMessage.content == '' || newMessage.content.length > 256)
      throw new ForbiddenException();
    const room = await this.findUserInRoom(newMessage.roomId, {
      userId: senderId,
    });
    if (!room) throw new NotFoundException();
    const sender = room.participants.find((user) => user.userId == senderId);
    if (sender.mute.getTime() > new Date().getTime())
      throw new ForbiddenException();
    const message = await this.messageService.create({
      content: newMessage.content,
      senderId,
      roomId: room.id,
    });
    if (!message) throw new UnprocessableEntityException();
    this.socialGateway.sendMessageToRoom(message, room.participants);

    return { ...message, isMuted: false };
  }

  async kickFromRoom(kickerId: string, managerRoomDto: ManagerRoomDto) {
    this.checkManagerState(kickerId, managerRoomDto);
    const newRoom = await this.leaveRoom(
      managerRoomDto.targetId,
      managerRoomDto.roomId,
    );
    if (!newRoom) throw new NotFoundException();
    this.socialGateway.leaveUserFromRoom(
      managerRoomDto.roomId,
      managerRoomDto.targetId,
    );
    this.socialGateway.emitToUser(managerRoomDto.targetId, 'on-chat-delete', {
      roomId: managerRoomDto.roomId,
    });
    this.socialGateway.emitToUser(managerRoomDto.roomId, 'on-chat-update', {
      id: managerRoomDto.roomId,
      participants: await this.participantService.createParticipantFromRoom(
        newRoom,
      ),
    });
  }

  async muteFromRoom(muterId: string, managerRoomDto: ManagerRoomDto) {
    this.checkManagerState(muterId, managerRoomDto);
    const participant = await this.prisma.participant.findFirst({
      where: {
        userId: managerRoomDto.targetId,
        roomId: managerRoomDto.roomId,
      },
    });
    const time = new Date();
    var timeToMute = new Date();

    if (participant.mute.getTime() < time.getTime()) {
      timeToMute = new Date(time.getTime() + managerRoomDto.time * 60000);
    } else {
      throw new ConflictException('Already mute');
    }
    const newRoom = await this.prisma.room.update({
      where: {
        id: managerRoomDto.roomId,
      },
      data: {
        participants: {
          updateMany: {
            where: { userId: managerRoomDto.targetId },
            data: { mute: timeToMute },
          },
        },
      },
      include: {
        participants: true,
        banned: true,
      },
    });
    this.socialGateway.emitToUser(managerRoomDto.roomId, 'on-chat-update', {
      id: managerRoomDto.roomId,
      banned: newRoom.banned.map((user) => user.username),
      participants: await this.participantService.createParticipantFromRoom(
        newRoom,
      ),
    });
  }

  async banFromRoom(bannerId: string, managerRoomDto: ManagerRoomDto) {
    await this.checkManagerState(bannerId, managerRoomDto);
    const room = await this.prisma.room.update({
      where: {
        id: managerRoomDto.roomId,
      },
      data: {
        banned: {
          connect: {
            id: managerRoomDto.targetId,
          },
        },
      },
      include: {
        participants: true,
        banned: true,
      },
    });
    await this.kickFromRoom(bannerId, managerRoomDto);
    this.socialGateway.emitToUser(managerRoomDto.roomId, 'on-chat-update', {
      id: managerRoomDto.roomId,
      banned: room.banned.map((banned) => banned.username),
    });
  }

  async unbanFromRoom(ownerId: string, roomId: string, bannedName: string) {
    if (!(await this.isOwner(ownerId, roomId))) throw new ForbiddenException();
    const room = await this.prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        banned: {
          disconnect: {
            username: bannedName,
          },
        },
      },
      include: {
        banned: true,
      },
    });

    this.socialGateway.emitToUser(roomId, 'on-chat-update', {
      id: roomId,
      banned: room.banned.map((banned) => banned.username),
    });
    return 'success';
  }

  async updateRoomName(userId: string, newName: string, roomId: string) {
    if (!(await this.isOwner(userId, roomId))) throw new ForbiddenException();
    if (newName == '') return;
    const room = await this.prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        name: newName,
      },
    });
    this.socialGateway.emitToUser(roomId, 'on-chat-update', {
      name: room.name,
      id: roomId,
    });
    return { name: room.name, id: roomId };
  }

  async updatePhoto(userId: string, roomId: string, file: Buffer) {
    if (!(await this.isOwner(userId, roomId))) throw new ForbiddenException();
    const room = await this.prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        avatar: file.toString('base64'),
      },
    });
    this.socialGateway.emitToUser(roomId, 'on-chat-update', {
      avatar: room.avatar,
      id: roomId,
    });
    return room.avatar;
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    if (!(await this.isOwner(userId, updatePasswordDto.roomId)))
      throw new ForbiddenException();
    if (!updatePasswordDto.password) {
      updatePasswordDto.password = '';
      updatePasswordDto.confirm = '';
    }
    if (updatePasswordDto.password != updatePasswordDto.confirm)
      throw new BadRequestException();
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(updatePasswordDto.password, salt);
    const room = await this.prisma.room.update({
      where: {
        id: updatePasswordDto.roomId,
      },
      data: {
        password: hash,
      },
    });
  }

  async setAdmin(userId: string, roomId: string, targetId: string) {
    await this.checkManagerState(userId, { roomId, targetId });
    const newRoom = await this.prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        participants: {
          updateMany: {
            where: {
              userId: targetId,
            },
            data: {
              role: Role.ADMIN,
            },
          },
        },
      },
      include: {
        participants: true,
      },
    });

    this.socialGateway.emitToUser(roomId, 'on-chat-update', {
      id: roomId,
      participants: await this.participantService.createParticipantFromRoom(
        newRoom,
      ),
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                    UTILS                                   */
  /* -------------------------------------------------------------------------- */
  concatenateID(id1: string, id2: string) {
    const sortedIds = [id1, id2].sort();
    return sortedIds.join('');
  }

  async findUserInRoom(roomId: string, toSearch: any) {
    return await this.prisma.room.findFirst({
      where: {
        id: roomId,
        participants: {
          some: toSearch,
        },
      },
      include: {
        participants: true,
      },
    });
  }

  async isOwner(userId: string, roomId: string) {
    const room = await this.prisma.room.findFirst({
      where: {
        id: roomId,
        participants: {
          some: {
            userId: userId,
            role: Role.OWNER,
          },
        },
      },
    });
    if (!room) return false;
    return true;
  }

  async findOne(id: string) {
    return await this.prisma.room.findUnique({
      where: { id },
      include: {
        participants: true,
        banned: true,
      },
    });
  }

  async findOneByName(name: string) {
    return await this.prisma.room.findUnique({
      where: { name },
      include: {
        participants: true,
        banned: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.room.delete({
      where: { id },
    });
  }

  async findRoomsForUser(userId: string) {
    return await this.prisma.room.findMany({
      where: {
        participants: {
          some: {
            user: { id: userId },
          },
        },
      },
      include: { participants: true, banned: true },
    });
  }

  async changeOwner(roomId: string) {
    const newOwner = await this.prisma.participant.findFirst({
      where: { roomId: roomId },
      orderBy: { joinedAt: 'desc' },
      take: 1,
    });
    await this.prisma.participant.update({
      where: { id: newOwner.id },
      data: { role: Role.OWNER },
    });
  }

  async createRoomReturnEntity(
    room: Room & { participants: Participant[]; banned: User[] },
    lastMessage: Message,
  ): Promise<ReturnRoomEntity> {
    return {
      id: room.id,
      avatar: room.avatar,
      name: room.name,
      isPrivate: room.isPrivate,
      lastMessage: lastMessage == undefined ? '' : lastMessage.content,
      isDm: room.isDm,
      isRead: false,
      owner: room.ownerId,
      participants: await this.participantService.createParticipantFromRoom(
        room,
      ),
      banned: room.banned.map((banned) => banned.username),
    };
  }

  async checkManagerState(managerId: string, managerRoomDto: ManagerRoomDto) {
    if (managerId == managerRoomDto.targetId) throw new NotFoundException();
    const isOwner = await this.isOwner(
      managerRoomDto.targetId,
      managerRoomDto.roomId,
    );
    if (isOwner) throw new ForbiddenException();
    const kicker = await this.findUserInRoom(managerRoomDto.roomId, {
      userId: managerId,
      role: Role.OWNER || Role.ADMIN,
    });
    if (!kicker) throw new NotFoundException();
    const user = await this.findUserInRoom(managerRoomDto.roomId, {
      userId: managerRoomDto.targetId,
    });
    if (!user) throw new NotFoundException();
  }
}
