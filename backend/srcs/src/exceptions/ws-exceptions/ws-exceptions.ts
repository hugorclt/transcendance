import { WsException } from '@nestjs/websockets';

type WsExceptionType =
  | 'BadRequest'
  | 'Unauthorized'
  | 'Forbidden'
  | 'NotFound'
  | 'Conflict'
  | 'InternalServerError';

export class WsTypeException extends WsException {
  readonly type: WsExceptionType;

  constructor(type: WsExceptionType, message: string | unknown) {
    const error = {
      type,
      message,
    };
    super(error);
    this.type = type;
  }
}

export class WsBadRequestException extends WsTypeException {
  constructor(message: string | unknown) {
    super('BadRequest', message);
  }
}

export class WsUnauthorizedException extends WsTypeException {
  constructor(message: string | unknown) {
    super('Unauthorized', message);
  }
}

export class WsForbiddenException extends WsTypeException {
  constructor(message: string | unknown) {
    super('Forbidden', message);
  }
}

export class WsNotFoundException extends WsTypeException {
  constructor(message: string | unknown) {
    super('NotFound', message);
  }
}

export class WsConflictException extends WsTypeException {
  constructor(message: string | unknown) {
    super('Conflict', message);
  }
}

export class WsInternalServerErrorException extends WsTypeException {
  constructor(message: string | unknown) {
    super('InternalServerError', message);
  }
}
