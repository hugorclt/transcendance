import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status } from '@prisma/client';
import { exclude } from 'src/utils/exclude';
import { UserEntity } from './entities/user.entity';
import { ReturnUserEntity } from './entities/return-user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const user:UserEntity = await this.prisma.user.create({ data: createUserDto });
    return exclude(user, ["password"]);
  }

  async findAll() {
    const users:UserEntity[] = await this.prisma.user.findMany({});
    return users.map(x => exclude(x, ["password"]));
  }

  async findOne(id: string) {
    const user:UserEntity = await this.prisma.user.findUnique({
      where: { id }
    });
    return exclude(user, ["password"]);
  }

  async findOneByUsername(username: string) {
    const user:UserEntity = await this.prisma.user.findUnique({
      where: { username }
    });
    return exclude(user, ["password"]);
  }

  async findConnected() {
    const users:UserEntity[] = await this.prisma.user.findMany({
      where: { status: Status.CONNECTED }
    });
    return users.map(x => exclude(x, ["password"]));
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id }
    });
  }
}
