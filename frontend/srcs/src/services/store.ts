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
});

export const friendAtom = atom<TFriend[]>([]);

export const conversationAtom = atom<TConversation[]>([]);

export const selectedPageAtom = atom<string>("/");
