import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Socket } from 'socket.io';
import { AuthSocket } from '../types/AuthSocket.types';

type SocketMiddleware = (socket: Socket, next: (err?: Error) => void) => void;

const WSAuthMiddleware = (
  jwtService: JwtService,
  usersService: UsersService,
): SocketMiddleware => {
  return async (socket: Socket, next) => {
    const authSocket = socket as AuthSocket;
    try {
      const jwtPayload = await jwtService.verify(socket.handshake.auth.jwt);
      const user = await usersService.findOne(jwtPayload.sub);
      if (user) {
        authSocket.userId = user.id;
        authSocket.username = user.username;
        next();
      } else {
        next({
          name: 'Unauthorized',
          message: 'Socket Unauthorized',
        });
      }
    } catch (error) {
      next({
        name: 'Unauthorized',
        message: 'Socket Unauthorized',
      });
    }
  };
};
export default WSAuthMiddleware;
