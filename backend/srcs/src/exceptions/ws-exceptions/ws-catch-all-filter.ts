import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSocket } from 'src/socket-adapter/types/AuthSocket.types';
import {
  WsBadRequestException,
  WsConflictException,
  WsForbiddenException,
  WsInternalServerErrorException,
  WsNotFoundException,
  WsUnauthorizedException,
} from './ws-exceptions';

@Catch()
export class WsCatchAllFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const socket: AuthSocket = host.switchToWs().getClient();

    if (exception instanceof BadRequestException) {
      const exceptionData = exception.getResponse();

      const WsException = new WsBadRequestException(
        exceptionData['message'] ?? 'Bad Request',
      );
      socket.emit('exception', WsException.getError());
      return;
    }

    if (exception instanceof UnauthorizedException) {
      const exceptionData = exception.getResponse();

      const WsException = new WsUnauthorizedException(
        exceptionData['message'] ?? 'Unauthorized',
      );
      socket.emit('exception', WsException.getError());
      return;
    }

    if (exception instanceof ForbiddenException) {
      const exceptionData = exception.getResponse();

      const WsException = new WsForbiddenException(
        exceptionData['message'] ?? 'Forbidden',
      );
      socket.emit('exception', WsException.getError());
      return;
    }

    if (exception instanceof NotFoundException) {
      const exceptionData = exception.getResponse();

      const WsException = new WsNotFoundException(
        exceptionData['message'] ?? 'Not found',
      );
      socket.emit('exception', WsException.getError());
      return;
    }

    if (exception instanceof ConflictException) {
      const exceptionData = exception.getResponse();

      const WsException = new WsConflictException(
        exceptionData['message'] ?? 'Conflict',
      );
      socket.emit('exception', WsException.getError());
      return;
    }

    if (exception instanceof HttpException) {
      const exceptionData = exception.getResponse();

      const WsException = new WsConflictException(
        exceptionData['message'] ?? '',
      );
      socket.emit('exception', WsException.getError());
      return;
    }

    const WsException = new WsInternalServerErrorException(exception.message);
    socket.emit('exception', WsException.getError());
  }
}
