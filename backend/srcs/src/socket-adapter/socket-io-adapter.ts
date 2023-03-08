import { INestApplicationContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import WSAuthMiddleware from './middlewares/WsAuthMiddleware';

export class SocketIoAdapter extends IoAdapter {
  constructor(private app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const cors = {
      credentials: true,
      origin: ['http://localhost:3002'],
      methods: ['GET', 'POST'],
    };
    const optionsWithCors: ServerOptions = {
      ...options,
      cors,
    };

    console.log('Configuring SocketIO with custom cors');

    const server = super.createIOServer(port, optionsWithCors);

    const jwtService = this.app.get(JwtService);
    const usersService = this.app.get(UsersService);

    console.log('Registering Socket.io middleware');
    server.of('lobbies').use(WSAuthMiddleware(jwtService, usersService));
    return server;
  }
}
