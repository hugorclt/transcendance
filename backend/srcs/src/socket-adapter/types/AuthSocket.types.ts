import { Socket } from 'socket.io';

export interface AuthSocket extends Socket {
  userId: string;
  username: string;
}

export interface AuthLobbySocket extends AuthSocket {
  status: string;
}
