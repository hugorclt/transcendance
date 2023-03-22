import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { ParticipantService } from './participant/participant.service';
import { Message, Participant, Role, Room } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { MessagesService } from './messages/messages.service';
import { SocialsGateway } from '../socials.gateway';
import { ReturnRoomEntity } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    private prisma: PrismaService,
    private participant: ParticipantService,
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
    console.log(createRoomDto);

    const room = await this.prisma.room.create({
      data: {
        name: createRoomDto.name,
        password: hash,
        avatar: '', //owner.avatar,
        isPrivate: createRoomDto.isPrivate,
        isDm: createRoomDto.isDm,
        type: 0,
        room: {
          create: createRoomDto.users.map((user) => ({
            user: { connect: { id: user.userId } },
            role: user.role as Role,
          })),
        },
        owner: { connect: { id: ownerId } },
      },
      include: {
        room: true,
        owner: true,
      },
    });

    const roomEntity = await this.createRoomReturnEntity(room, undefined);
    console.log('room entity has been created: ', roomEntity);

    await this.socialGateway.joinUsersToRoom(
      room,
      createRoomDto.users.map((user) => user.userId),
    );
    this.socialGateway.emitRoomCreated(room.ownerId, roomEntity);
    return roomEntity;
  }

  async findHistory(userId: string) {
    const list = await this.findRoomsForUser(userId);

    return Promise.all(
      list.flatMap(async (room) => {
        const lastMessage = await this.messageService.getLastMessage(room.id);

        if (room.ownerId != userId && lastMessage == null) return;

        await this.socialGateway.joinUserToRoom(room.id, userId);
        return this.createRoomReturnEntity(room, lastMessage);
      }),
    );
  }

  findAll() {
    return this.prisma.room.findMany({});
  }

  findOne(id: string) {
    return this.prisma.room.findUnique({
      where: { id },
      include: {
        room: true,
      },
    });
  }

  findOneByName(name: string) {
    return this.prisma.room.findUnique({
      where: { name },
      include: {
        room: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.room.delete({
      where: { id },
    });
  }

  async findRoomsForUser(userId: string) {
    return await this.prisma.room.findMany({
      where: {
        room: {
          some: {
            user: { id: userId },
          },
        },
      },
      include: { room: true },
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
    room: Room & { room: Participant[] },
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
      participants: await this.participant.createParticipantFromRoom(room),
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
    var nbParticipant = oldRoom.room.length;
    const participantToDel = await this.prisma.participant.findFirst({
      where: {
        userId: userId,
        roomId: roomId,
      },
    });
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
    console.log('calling gateway from rooms service');
    this.socialGateway.leaveUserFromRoom(roomId, userId);
    if (newRoom)
      this.socialGateway.emitToUser(newRoom.id, 'on-chat-update', {
        id: newRoom.id,
        participants: await this.participant.createParticipantFromRoom(newRoom),
      });
    return newRoom;
  }

  async newMessage(senderId: string, payload: any): Promise<any> {
    if (payload.message == '' || payload.message.length > 256) return;
    const room = await this.prisma.room.findFirst({
      where: {
        id: payload.roomId,
        room: {
          //wtf
          some: {
            userId: senderId,
          },
        },
      },
    });
    if (!room) return;
    const message = await this.messageService.create({
      content: payload.message,
      senderId,
      roomId: room.id,
    });
    if (!message) return;
    this.socialGateway.sendMessageToRoom(message);

    return message;
  }

  // UTILS
  concatenateID(id1: string, id2: string) {
    const sortedIds = [id1, id2].sort();
    return sortedIds.join('');
  }
}
