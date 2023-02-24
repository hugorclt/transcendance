import { Module } from '@nestjs/common';
import { SocketEvents } from './socketEvents';

@Module({
  providers: [SocketEvents],
})
export class SocketModule {}
