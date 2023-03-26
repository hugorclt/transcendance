import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { ParticipantService } from './participant/participant.service';
import { Message, Participant, Role, Room, User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { MessagesService } from './messages/messages.service';
import { SocialsGateway } from '../socials.gateway';
import { ReturnRoomEntity } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    private prisma: PrismaService,
    private participantService: ParticipantService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private messageService: MessagesService,
    private socialGateway: SocialsGateway,
  ) {}

  async create(createRoomDto: CreateRoomDto, ownerId: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createRoomDto.password, salt);

    createRoomDto.users.push({ userId: ownerId, role: 'OWNER' });
    // if (createRoomDto.isDm == true) {
    //   const id1 = await this.usersService.findOneByUsername(
    //     createRoomDto.users[0].username,
    //   );
    //   const id2 = createRoomDto.users.find((user) => user.role == "OWNER");
    //   const owner
    //   const concatenatedID = this.concatenateID(id1.id, id2);

    //   const roomExists = await this.findOneByName(concatenatedID);
    //   if (roomExists !== null) return roomExists;
    //   createRoomDto.name = concatenatedID;
    // }

    const room = await this.prisma.room.create({
      data: {
        name: createRoomDto.name,
        password: hash,
        avatar: '', //owner.avatar,
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
    this.socialGateway.emitRoomCreated(room.ownerId, roomEntity);
    return roomEntity;
  }

  async findHistory(userId: string) {
    const list = await this.findRoomsForUser(userId);

    return await Promise.all(
      list.flatMap(async (room) => {
        const lastMessage = await this.messageService.getLastMessage(room.id);

        if (room.ownerId != userId && lastMessage == null) return;
        return this.createRoomReturnEntity(room, lastMessage);
      }),
    );
  }

  async joinRoom(userId: string, name: string, password: string) {
    const room = await this.findOneByNameBanned(name);
    const isAlreadyIn = room.participants.find((user) => user.id == userId);
    if (isAlreadyIn) return;
    const isBanned = room.banned.find((user) => user.id == userId);
    if (isBanned) return;
    const checkPassword = await bcrypt.compare(password, room.password);
    if (!checkPassword) return;
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
      }
    });
    this.socialGateway.emitToUser(room.id, 'on-chat-update', {
      id: room.id,
      participants: await this.participantService.createParticipantFromRoom(
        newRoom,
      ),
    });
    this.socialGateway.joinUserToRoom(room.id, userId);
    return this.createRoomReturnEntity(newRoom, await this.messageService.getLastMessage(newRoom.id));
  }

  findAll() {
    return this.prisma.room.findMany({});
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

  async findOneByNameBanned(name: string) {
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

  async findConvHistory(roomName: string) {
    const room = await this.findOneByName(roomName);
    if (!room) return; //error

    const messages = await this.messageService.getMessages(room.id);
    return messages.map((message) => {
      return {
        content: message.content,
        senderId: message.senderId,
        roomId: message.roomId,
      };
    });
  }

  async getParticipantsInRoom(roomName: string) {
    const room = await this.findOneByName(roomName);
    const participants = await this.prisma.participant.findMany({
      where: {
        roomId: room.id,
      },
    });

    return await Promise.all(
      participants.map(async (participant) => {
        const user = await this.usersService.findOne(participant.userId);
        return {
          name: user.username,
          status: user.status,
          role: participant.role,
        };
      }),
    );
  }

  async createRoomReturnEntity(
    room: Room & { participants: Participant[], banned: User[] },
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
      participants: await this.participantService.createParticipantFromRoom(
        room,
      ),
      banned: room.banned.map((banned) => banned.username),
    };
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

  async leaveRoom(userId: string, roomId: string) {
    const oldRoom = await this.findOne(roomId);
    var nbParticipant = oldRoom.participants.length;
    const participantToDel = await this.prisma.participant.findFirst({
      where: {
        userId: userId,
        roomId: roomId,
      },
    });
    if (!participantToDel) return;
    await this.prisma.participant.delete({
      where: {
        id: participantToDel.id,
      },
    });

    nbParticipant -= 1;
    if (nbParticipant != 0 && participantToDel.role == Role.OWNER) {
      this.changeOwner(roomId);
    }

    if (nbParticipant == 0) {
      await this.prisma.room.delete({
        where: { id: roomId },
      });
    }

    const newRoom = await this.findOne(roomId);
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

  async newMessage(senderId: string, payload: any): Promise<any> {
    if (payload.message == '' || payload.message.length > 256) return;
    const room = await this.prisma.room.findFirst({
      where: {
        id: payload.roomId,
        participants: {
          some: {
            userId: senderId,
          },
        },
      },
      include: {
        participants: true,
      },
    });
    const sender = room.participants.find((user) => user.userId == senderId);
    if (sender.isMute == true) return { isMuted: true };
    if (!room) return;
    const message = await this.messageService.create({
      content: payload.message,
      senderId,
      roomId: room.id,
    });
    if (!message) return;
    this.socialGateway.sendMessageToRoom(message);

    return { ...message, isMuted: false };
  }

  async kickFromRoom(kickerId: string, userId: string, roomId: string) {
    if (kickerId == userId) return;
    if (!this.isOwner(userId, roomId)) return;
    const kicker = await this.findUserInRoom(roomId, {
      userId: kickerId,
      role: Role.OWNER || Role.ADMIN,
    });
    if (!kicker) return;
    const newRoom = await this.leaveRoom(userId, roomId);
    if (!newRoom) return;
    this.socialGateway.leaveUserFromRoom(roomId, userId);
    this.socialGateway.emitToUser(userId, 'on-chat-delete', { roomId });
    this.socialGateway.emitToUser(roomId, 'on-chat-update', {
      id: roomId,
      participants: await this.participantService.createParticipantFromRoom(
        newRoom,
      ),
    });
  }

  async muteFromRoom(
    muterId: string,
    userId: string,
    roomId: string,
    isMute: boolean,
    time: number,
  ) {
    if (muterId == userId) return;
    if (!this.isOwner(userId, roomId)) return;
    const muter = await this.findUserInRoom(roomId, {
      userId: muterId,
      role: Role.OWNER || Role.ADMIN,
    });
    if (!muter) return;
    const user = await this.findUserInRoom(roomId, {
      userId: userId,
    });
    if (!user) return;
    const newRoom = await this.prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        participants: {
          updateMany: {
            where: { userId: userId },
            data: { isMute: !isMute },
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

  async banFromRoom(bannerId: string, userId: string, roomId: string) {
    if (bannerId == userId) return;
    if (!this.isOwner(userId, roomId)) return;
    const banner = await this.findUserInRoom(roomId, {
      userId: bannerId,
      role: Role.OWNER || Role.ADMIN,
    });
    if (!banner) return;
    const user = await this.findUserInRoom(roomId, {
      userId: userId,
    });
    if (!user) return;
    await this.prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        banned: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        participants: true,
      },
    });
    this.kickFromRoom(bannerId, userId, roomId);
  }

  // UTILS
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
    console.log(room);
    if (!room) return false;
    return true;
  }
}
