import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { ReactNode, useContext, useEffect, useState } from "react";
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
    axiosPrivate
      .get("/users/me")
      .then((res: AxiosResponse) => {
        setUser((prev) => ({
          ...prev,
          ...res.data,
        }));
      })
      .catch((res: AxiosError) =>
        navigate("/login", { state: { from: location }, replace: true })
      );
  }, []);

  useEffect(() => {
    console.log("user atom has been updated with values: ", user);
  }, [user]);

  useEffect(() => {
    socket?.on("on-self-status-update", (newStatus) => {
      console.log("self status update");
      console.log("user atom on status update: ", user);
      setUser((prev) => ({ ...prev, status: newStatus }));
    });

    return () => {
      socket?.off("on-self-status-update");
    };
  }, [socket]);

  return <>{children}</>;
}

export default UserProvider;
