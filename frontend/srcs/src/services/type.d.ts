export interface TUser {
  id: string;
  username: string;
  status: string;
  avatar: string;
  exp: number;
  balance: number;
}

export interface TUserPreferences {
  visibility: string;
}
export interface TLobby {
  id: string;
  ownerId: string;
  mode: string;
  nbPlayers: number;
}

export interface TPlayer {
  id: string;
  team: number;
  status: string;
}

export interface TFriend {
  id: string;
  username: string;
  status: string;
  avatar: string;
}

export interface TConversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  isDm: boolean;
  isRead: boolean;
  isActive: boolean;
  participants: TParticipant[];
}

export interface TParticipant {
  id: string;
  name: string;
  role: string;
  status: string;
}

export interface TSelectedPage {
  selectedPage: number;
}
