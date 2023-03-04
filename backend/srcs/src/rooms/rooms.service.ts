import { Injectable, Request } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnUserEntity } from 'src/users/entities/return-user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createRoomDto.password, salt);

    return this.prisma.room.create({
      data: {
        name: createRoomDto.name,
        password: hash,
        isPrivate: createRoomDto.isPrivate,
        adminId: createRoomDto.creatorId,
        type: 0,
      }
    });
  }
  

  findAll() {
    return this.prisma.room.findMany({});
  }

  findOne(id: string) {
    return this.prisma.room.findUnique({
      where: {id}
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
      where: {id}
    });
  }
}
