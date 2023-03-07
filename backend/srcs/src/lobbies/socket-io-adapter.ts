import { INestApplicationContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { SocketWithAuth } from './types';

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
    const jwtService = this.app.get(JwtService);
    //will create a socket.io server with cors enabled
    console.log('Configuring SocketIO with custom cors');

    return super.createIOServer(port, optionsWithCors);

    //This will use our jwt verification middleware for the namespace Lobbies
    // server.of('lobbies').use(createSocketAccessGuard(jwtService));
  }
}

// const createSocketAccessGuard =
//   (jwtService: JwtService) => (socket: SocketWithAuth, next) => {
//     // for Postman testing support, fallback to token header
//     const token =
//       socket.handshake.auth.token || socket.handshake.headers['token'];

//     console.log(`Validating auth token before connection: ${token}`);

//     try {
//       const payload = jwtService.verify(token);
//       socket.userID = payload.sub;
//       socket.pollID = payload.pollID;
//       socket.name = payload.name;
//       next();
//     } catch {
//       next(new Error('FORBIDDEN'));
//     }
//   };
