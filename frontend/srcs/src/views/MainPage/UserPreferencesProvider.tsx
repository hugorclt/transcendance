import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { ReactNode, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { SocketContext } from "../../services/Auth/SocketContext";
import { userPreferencesAtom } from "../../services/store";

function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const [userPreferences, setUserPreferences] = useAtom(userPreferencesAtom);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useContext(SocketContext);

  useEffect(() => {
    axiosPrivate
      .get("/users/me/preferences")
      .then((res: AxiosResponse) => setUserPreferences(res.data))
      .catch((res: AxiosError) =>
        navigate("/login", { state: { from: location }, replace: true })
      );
  }, []);

  useEffect(() => {
    socket?.on("on-visibility-update", (visibility) => {
      setUserPreferences((prev) => ({ ...prev, visibility: visibility }));
    });

    return () => {
      socket?.off("on-visibility-update");
    };
  }, [socket]);
  return <>{children}</>;
}

export default UserPreferencesProvider;
