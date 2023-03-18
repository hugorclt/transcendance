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
      console.log('token: ', socket.handshake.auth.jwt);
      console.log('secret: ', process.env['AT_SECRET']);
      const jwtPayload = await jwtService.verify(socket.handshake.auth.jwt);
      console.log('token has been verified');
      const user = await usersService.findOne(jwtPayload.sub);
      if (user) {
        authSocket.userId = user.id;
        authSocket.username = user.username;
        next();
      } else {
        console.log('middleware error: User not found');
        next({
          name: 'Unauthorized',
          message: 'Unauthorized',
        });
      }
    } catch (error) {
      console.log('middleware error: ', error);
      next({
        name: 'Unauthorized',
        message: 'Unauthorized',
      });
    }
  };
};
export default WSAuthMiddleware;
