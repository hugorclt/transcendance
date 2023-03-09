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

    //If the original exception was a WsBadRequestException
    if (exception instanceof BadRequestException) {
      console.log('BadRequest exception');
      const exceptionData = exception.getResponse();

      const WsException = new WsBadRequestException(
        exceptionData['message'] ?? 'Bad Request',
      );
      socket.emit('exception', WsException.getError());
      return;
    }

    //If the original exception was a WsUnauthorizedException
    if (exception instanceof UnauthorizedException) {
      console.log('Unauthorized exception');
      const exceptionData = exception.getResponse();

      const WsException = new WsUnauthorizedException(
        exceptionData['message'] ?? 'Unauthorized',
      );
      socket.emit('exception', WsException.getError());
      return;
    }

    //If the original exception was a WsForbiddenException
    if (exception instanceof ForbiddenException) {
      console.log('Forbidden exception');
      const exceptionData = exception.getResponse();

      const WsException = new WsForbiddenException(
        exceptionData['message'] ?? 'Forbidden',
      );
      socket.emit('exception', WsException.getError());
      return;
    }

    //If the original exception was a WsNotFoundException
    if (exception instanceof NotFoundException) {
      console.log('NotFound exception');
      const exceptionData = exception.getResponse();

      const WsException = new WsNotFoundException(
        exceptionData['message'] ?? 'Not found',
      );
      socket.emit('exception', WsException.getError());
      return;
    }

    //If the original exception was a WsConflictException
    if (exception instanceof ConflictException) {
      console.log('conflict exception');
      const exceptionData = exception.getResponse();

      const WsException = new WsConflictException(
        exceptionData['message'] ?? 'Conflict',
      );
      socket.emit('exception', WsException.getError());
      return;
    }

    if (exception instanceof HttpException) {
      console.log('Error type not detected');
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
