import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { userAtom } from "../../services/store";

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useAtom(userAtom);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axiosPrivate
      .get("/users/me")
      .then((res: AxiosResponse) =>
        setUser((prev) => ({
          ...prev,
          id: res.data.id,
          username: res.data.username,
          status: res.data.status,
          avatar: res.data.avatar,
          exp: res.data.exp,
          balance: res.data.balance,
        }))
      )
      .catch((res: AxiosError) =>
        navigate("/login", { state: { from: location }, replace: true })
      );
  }, []);
  return <>{children}</>;
}

export default UserProvider;
