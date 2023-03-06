import { Socket } from 'socket.io';
// guard types
export type AuthPayload = {
  userID: string;
  pollID: string;
  name: string;
};

export type SocketWithAuth = Socket & AuthPayload;
