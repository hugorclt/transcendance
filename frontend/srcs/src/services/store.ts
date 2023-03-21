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
  status: "",
  avatar: "",
  exp: 0,
  balance: 0,
});

export const userPreferencesAtom = atom<TUserPreferences>({
  visibility: "",
});

export const lobbyAtom = atom<TLobby>({
  id: "",
  ownerId: "",
  nbPlayers: 0,
  mode: "",
});

export const friendAtom = atom<TFriend[]>([]);

export const conversationAtom = atom<TConversation[]>([]);

export const conversationDefaultValue = {
  id: "",
  name: "",
  avatar: "",
  lastMessage: "",
  isDm: true,
  isRead: true,
  participants: [
    {
      id: "",
      name: "",
      role: "",
      status: "",
    },
  ],
};

export const activeChat = atom<TConversation>(conversationDefaultValue);

export const selectedPageAtom = atom<number>(0);
