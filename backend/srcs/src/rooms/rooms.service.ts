import { Injectable, Request } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnUserEntity } from 'src/users/entities/return-user.entity';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  create(@Request() req) {
    console.log(req);
    // return this.prisma.room.create({
    //   data: 
    // })
  }

  findAll() {
    return this.prisma.room.findMany({});
  }

  findOne(id: string) {
    return this.prisma.room.findUnique({
      where: {id}
    });
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.prisma.room.update({
      where: {id},
      data: updateRoomDto,
    });
  }

  remove(id: string) {
    return this.prisma.room.delete({
      where: {id}
    });
  }
}
