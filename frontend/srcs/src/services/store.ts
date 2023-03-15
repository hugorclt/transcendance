import { atom } from "jotai";
import { TConversation, TFriend, TSelectedPage, TUser } from "./type";

export const userAtom = atom<TUser>({
  id: "",
  username: "",
  status: "",
  avatar: "",
  exp: 0,
  balance: 0,
});

export const friendAtom = atom<TFriend[]>([]);

export const conversationAtom = atom<TConversation[]>([]);

export const selectedPageAtom = atom<number>(0);
