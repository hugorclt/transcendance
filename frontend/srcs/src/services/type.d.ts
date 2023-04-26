import { EItem } from "../shared/enum";

export interface TUser {
  id: string;
  username: string;
  accessToken: string;
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
  state: string;
  private: boolean;
}

export interface TLobbyMember {
  id: string;
  userId: string;
  team: boolean;
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
  banned: string[];
  participants: TParticipant[];
}

export interface TParticipant {
  id: string;
  avatar: string;
  name: string;
  role: string;
  status: string;
  mute: Date;
}

export interface TSelectedPage {
  selectedPage: number;
}

export interface TStat {
  id: string;
  xp: number;
  lvl: number;
  nbGame: number;
  nbWin: number;
}

export interface TItem {
  id: string;
  name: string;
  price: number;
  image: string;
  type: EItem;
}

export interface TNotif {
  id: string;
  username: string;
  desc: string;
  type: EInvitationType;
  lobbyId: string;
  userId: string;
  userFromId: string;
}
export interface TMatch {
  id: string;
  winnerScore: number;
  winners: TUser[];
  loserScore: number;
  losers: TUser[];
}
