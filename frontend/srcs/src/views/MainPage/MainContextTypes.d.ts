export interface TMainPageContext {
  selectedPage: number;
  setSelectedPage: Dispatch<React.SetStateAction<number>>;
}

export interface TUserContext {
  user: TUser;
  setUser: Dispatch<React.SetStateAction<TUser>>;
}

export interface TFriendListContext {
  friendList: TFriend[];
  setFriendList: Dispatch<React.SetStateAction<TFriend[]>>;
}

export interface TUser {
  id: string;
  username: string;
  avatar: string;
  email: string;
  status: string;
  balance: number;
}

export interface TFriend {
  id: string;
  username: string;
  status: string;
  avatar: string;
}
