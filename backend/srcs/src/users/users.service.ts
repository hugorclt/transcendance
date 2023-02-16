import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, CreateGoogleUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status, Type } from '@prisma/client';
import { exclude } from 'src/utils/exclude';
import { UserEntity } from './entities/user.entity';
import { ReturnUserEntity } from './entities/return-user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) : Promise<ReturnUserEntity> {
    const user:UserEntity = await this.prisma.user.create({ data: createUserDto });
    return exclude(user, ["password", "type"]);
  }

  async createGoogle(createGoogleUserDto: CreateGoogleUserDto) : Promise<ReturnUserEntity> {
    const user:UserEntity = await this.prisma.user.create({ data: createGoogleUserDto });
    return exclude(user, ["password", "type"]);
  }

  async findAll() : Promise<ReturnUserEntity[]> {
    const users:UserEntity[] = await this.prisma.user.findMany({});
    if (users)
      return users.map(x => exclude(x, ["password", "type"]));
    throw new NotFoundException();
  }

  async findOne(id: string) : Promise<ReturnUserEntity> {
    const user:UserEntity = await this.prisma.user.findUnique({
      where: { id }
    });
    if (user)
      return exclude(user, ["password", "type"]);
    throw new NotFoundException();
  }

  async findOneByUsername(username: string) : Promise<ReturnUserEntity> {
    const user:UserEntity = await this.prisma.user.findUnique({
      where: { username }
    });
    if (user)
      return exclude(user, ["password", "type"]);
    throw new NotFoundException();
  }

  async findOneByUser(username: string) : Promise<UserEntity> {
    const user:UserEntity = await this.prisma.user.findUnique({
      where: { username }
    });
    if (user)
      return (user);
    throw new NotFoundException();
  }

  async findOneByEmail(email: string) : Promise<ReturnUserEntity> {
    const user:UserEntity = await this.prisma.user.findUnique({
      where: { email }
    });
    if (user)
      return exclude(user, ["password", "type"]);
    throw new NotFoundException();
  }

  async findOneGoogleUser(email: string) : Promise<ReturnUserEntity> {
    const user:UserEntity = await this.prisma.user.findFirst({
      where: { 
        email: email,
        type: Type.GOOGLE,
      }
    });
    if (user)
      return exclude(user, ["password", "type"]);
    throw new NotFoundException();
  }

  async findConnected() : Promise<ReturnUserEntity[]>{
    const users:UserEntity[] = await this.prisma.user.findMany({
      where: { status: Status.CONNECTED }
    });
    if (users)
      return users.map(x => exclude(x, ["password", "type"]));
    throw new NotFoundException();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user:UserEntity = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
    if (user)
      return exclude(user, ["password", "type"]);
    throw new NotFoundException();
  }

  async remove(id: string) {
    const user:UserEntity = await this.prisma.user.delete({
      where: { id }
    });
    if (user)
      return exclude(user, ["password", "type"]);
    throw new NotFoundException();
  }
}