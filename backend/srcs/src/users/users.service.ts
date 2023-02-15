import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id }
    });
  }

  findOneByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username }
    });
  }

  findConnected() {
    return this.prisma.user.findMany({
      where: { status: Status.CONNECTED }
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id }
    });
  }
}
