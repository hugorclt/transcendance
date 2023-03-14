import React, { useState, createContext, ReactNode, useContext } from "react";
import { TFriend, TMainPageContext, TUser } from "./MainContextTypes";
import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const defaultValue = {
  selectedPage: 0,
  setSelectedPage: () => {},
  friendList: [],
  setFriendList: () => {},
  user: {
    id: "",
    username: "",
    avatar: "",
    email: "",
    status: "",
    balance: 0,
  },
  setUser: () => {},
};

export const MainContext = createContext<TMainPageContext>(defaultValue);

type MainProviderProps = {
  children: ReactNode;
};

export function MainProvider({ children }: MainProviderProps) {
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const [user, setUser] = useState<TUser>(defaultValue.user);
  const [friendList, setFriendList] = useState<Array<TFriend>>([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    axiosPrivate
      .get("/users/me")
      .then((res: AxiosResponse) => setUser(res.data))
      .catch((res: AxiosError) =>
        navigate("/login", { state: { from: location }, replace: true })
      );

    axiosPrivate
      .get("users/friends")
      .then((res: AxiosResponse) => {
        const friends = res.data.map((element: any) => ({
          id: element.id,
          username: element.username,
          avatar: element.avatar,
          status: element.status,
        }));
        console.log("friends; ", friends);
        setFriendList(friends);
      })
      .catch((err: AxiosError) => {
        console.log("Error while fetching friendlist");
      });

    console.log("friends loaded");
  }, []);

  return (
    <MainContext.Provider
      value={{
        selectedPage,
        setSelectedPage,
        user,
        setUser,
        friendList,
        setFriendList,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export function useMainContext(): TMainPageContext {
  return useContext(MainContext);
}

export default MainProvider;
