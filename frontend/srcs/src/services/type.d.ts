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
  members: TLobbyMember[];
}

export interface TLobbyMember {
  id: string;
  userId: string;
  team: string;
  ready: boolean;
  user: {
    username: string;
  };
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
  isMute: boolean;
}

export interface TSelectedPage {
  selectedPage: number;
}
