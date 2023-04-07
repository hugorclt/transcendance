import { atom } from "jotai";
import {
  TConversation,
  TFriend,
  TLobby,
  TUser,
  TUserPreferences,
} from "./type";

export const userAtom = atom<TUser>({
  id: "",
  username: "",
  accessToken: "",
  status: "",
  avatar: "",
  exp: 0,
  balance: 0,
  stats: {
    id: "",
    xp: 0,
    lvl: 0,
    nbGame: 0,
    nbWin: 0,
  },
});

export const searchUserAtom = atom<string>("");

export const userPreferencesAtom = atom<TUserPreferences>({
  visibility: "",
});

export const lobbyAtom = atom<TLobby>({
  id: "",
  ownerId: "",
  nbPlayers: 0,
  mode: "",
  members: [],
  state: "",
  private: false,
});

export const friendAtom = atom<TFriend[]>([]);

export const conversationAtom = atom<TConversation[]>([]);

export const selectedPageAtom = atom<string>("/");
