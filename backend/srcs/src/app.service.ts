import { Injectable } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, World!';
  }

  getUser() : any {
    const prisma = new PrismaClient();

    const all = prisma.user.findMany();
    return all;
  }
}
