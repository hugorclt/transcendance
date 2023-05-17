import { atom, useAtom } from "jotai";
import {
  TConversation,
  TEndGame,
  TFriend,
  TLobby,
  TMatch,
  TNotif,
  TUser,
  TUserPreferences,
} from "./type";

export const userDefaultValue = {
  id: "",
  username: "",
  accessToken: "",
  status: "",
  avatar: "",
  exp: 0,
  balance: 0,
  is2fa: false,
};
export const userAtom = atom<TUser>(userDefaultValue);

export const searchUserAtom = atom<string>("");

export const userPreferencesDefaultValue = {
  visibility: "",
};

export const userPreferencesAtom = atom<TUserPreferences>(
  userPreferencesDefaultValue
);

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

export const matchAtom = atom<TMatch[]>([]);

export const notifAtom = atom<TNotif[]>([]);

export const sideBarAtom = atom<boolean>(false);

export const endGameDefaultValue: TEndGame = {
  winnerScore: 0,
  winners: [],
  loserScore: 0,
  losers: [],
  xp: 0,
  money: 0,
};

export const endGameAtom = atom<TEndGame>(endGameDefaultValue);

export function useResetAtoms() {
  const [user, setUser] = useAtom(userAtom);
  const [searchUser, setSearchUser] = useAtom(searchUserAtom);
  const [userPreferences, setUserPreferences] = useAtom(userPreferencesAtom);
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [friends, setFriends] = useAtom(friendAtom);
  const [conversations, setConversations] = useAtom(conversationAtom);
  const [matches, setMatches] = useAtom(matchAtom);
  const [notifs, setNotifs] = useAtom(notifAtom);
  const [sideBar, setSideBar] = useAtom(sideBarAtom);
  const [endGame, setEndGame] = useAtom(endGameAtom);

  const resetAtom = () => {
    setUser(userDefaultValue);
    setSearchUser("");
    setUserPreferences(userPreferencesDefaultValue);
    setLobby(lobbyDefaultValue);
    setFriends([]);
    setConversations([]);
    setMatches([]);
    setNotifs([]);
    setSideBar(false);
    setEndGame(endGameDefaultValue);
  };

  return resetAtom;
}
