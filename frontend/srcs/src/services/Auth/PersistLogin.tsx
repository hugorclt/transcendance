import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useAtom } from "jotai";
import { userAtom } from "../store";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const [user, setUser] = useAtom(userAtom);
  const [errMsg, setErrMsg] = useState<string>("");

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        setErrMsg("Error refreshing");
      } finally {
        setErrMsg("");
        setIsLoading(false);
      }
    };

    !user?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <h1>Loading...</h1> : <Outlet />}</>;
}

export default PersistLogin;
