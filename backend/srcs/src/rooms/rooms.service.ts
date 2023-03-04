import { Injectable, Request } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnUserEntity } from 'src/users/entities/return-user.entity';
import bcrypt from 'bcrypt';
import { ParticipantService } from './participant/participant.service';
import { Role } from '@prisma/client';
import { FriendsActivityService } from 'src/friends-activity/friends-activity.service';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService, private participant: ParticipantService, private friendActivity: FriendsActivityService) {}

  async create(createRoomDto: CreateRoomDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createRoomDto.password, salt);

    const room = await this.prisma.room.create({
      data: {
        name: createRoomDto.name,
        password: hash,
        isPrivate: createRoomDto.isPrivate,
        ownerId: createRoomDto.creatorId,
        type: 0,
        room: {
          create: createRoomDto.users.map((user) => ({
            user: { connect: { username: user } },
          })), 
        },
      },
      include: {
        room: true,
      },
    });

    await this.participant.create({
      roomId: room.id,
      userId: createRoomDto.creatorId,
      role: Role.OWNER,
    });

    const owner = await this.prisma.user.findUnique({
      where: {
        id: createRoomDto.creatorId,
      }
    })

    this.friendActivity.socket.to(owner.id).emit("on-new-chat", {avatar: owner.avatar, name: createRoomDto.name, lastMessage: ""})
    return room;
  }

  findAll() {
    return this.prisma.room.findMany({});
  }

  findOne(id: string) {
    return this.prisma.room.findUnique({
      where: { id },
    });
  }

  // update(id: string, updateRoomDto: UpdateRoomDto) {
  //   return this.prisma.room.update({
  //     where: {id},
  // data: updateRoomDto,
  //   });
  // }

  remove(id: string) {
    return this.prisma.room.delete({
      where: { id },
    });
  }
}
