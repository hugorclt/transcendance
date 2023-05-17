import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { resetAtoms, userAtom, userDefaultValue } from "../../services/store";
import { SocketContext } from "../../services/Auth/SocketContext";

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useAtom(userAtom);
  const [isLoaded, setIsLoaded] = useState(false);
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
          exp: res.data.xp,
        }));
        setIsLoaded(true);
      })
      .catch((res: AxiosError) =>
        navigate("/login", { state: { from: location }, replace: true })
      );
  }, []);

  useEffect(() => {
    socket?.on("on-self-status-update", (newStatus) => {
      setUser((prev) => ({ ...prev, status: newStatus }));
      if (newStatus === "DISCONNECTED") {
        setUser(userDefaultValue);
        resetAtoms();
        navigate("/login", { state: { from: location }, replace: true });
      }
    });

    return () => {
      socket?.off("on-self-status-update");
    };
  }, [socket]);

  return <>{isLoaded == true ? children : <h1>Loading...</h1>}</>;
}

export default UserProvider;
