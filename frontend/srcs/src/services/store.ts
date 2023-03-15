import { atom } from "jotai";
import { TConversation, TFriend, TUser } from "./type";

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

export const conversationDefaultValue = {
  id: "",
  name: "",
  avatar: "",
  lastMessage: "",
  isDm: true,
  participants: [
    {
      id: "",
      name: "",
      role: "",
    },
  ],
}

export const activeChat = atom<TConversation>(conversationDefaultValue);
