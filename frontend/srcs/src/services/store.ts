import { atom } from "jotai";
import {
  TConversation,
  TFriend,
  TItem,
  TLobby,
  TMatch,
  TNotif,
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

export const lobbyDefaultValue = {
  id: "",
  ownerId: "",
  nbPlayers: 0,
  mode: "",
  members: [],
  state: "",
  private: false,
};

export const lobbyAtom = atom<TLobby>(lobbyDefaultValue);

export const friendAtom = atom<TFriend[]>([]);

export const conversationAtom = atom<TConversation[]>([]);

export const selectedPageAtom = atom<string>("/");

export const matchAtom = atom<TMatch[]>([]);

export const notifAtom = atom<TNotif[]>([]);

export const sideBarAtom = atom<boolean>(false);
