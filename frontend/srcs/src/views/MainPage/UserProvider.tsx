import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { ReactNode, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { userAtom } from "../../services/store";
import { SocketContext } from "../../services/Auth/SocketContext";

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useAtom(userAtom);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useContext(SocketContext);

  useEffect(() => {
    console.log("user provider");
    axiosPrivate
      .get("/users/me")
      .then((res: AxiosResponse) => {
        console.log("user should be: ", res.data);
        setUser((prev) => ({
          ...prev,
          id: res.data.id,
          username: res.data.username,
          status: res.data.status,
          avatar: res.data.avatar,
          exp: res.data.exp,
          balance: res.data.balance,
        }));
      })
      .catch((res: AxiosError) =>
        navigate("/login", { state: { from: location }, replace: true })
      );
  }, []);

  useEffect(() => {
    socket?.on("on-self-status-update", (newStatus) => {
      setUser((prev) => ({ ...prev, status: newStatus }));
    });

    return () => {
      socket?.off("on-self-status-update");
    };
  }, [socket]);

  return <>{children}</>;
}

export default UserProvider;
