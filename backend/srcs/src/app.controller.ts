import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './prisma/user.service';
import { User as UserModel } from '@prisma/client'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get('/hello')
  getHello(): any {
    return this.appService.getHello();
  }

  @Get('/user/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  @Get('/user-list')
  async getUserList(): Promise<UserModel[]> {
    return this.userService.users({})
  }

  @Get()
  getIndex(): any {
    return this.appService.getHello();
  }
}
