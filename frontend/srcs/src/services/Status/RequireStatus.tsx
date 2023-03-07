import React, { useEffect, useRef } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { useGlobal } from "../Global/GlobalProvider";

function RequireStatus() {
  const { status, setStatus } = useGlobal();
  const location = useLocation();
  const querySent = useRef(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!querySent.current) {
      console.log("Getting status information");
      axiosPrivate
        .get("/users/status")
        .then((res: AxiosResponse) => {
          setStatus(res.data.status);
        })
        .catch((err: AxiosError) => {
          console.log(JSON.stringify(err));
        });
      querySent.current = true;
    }
  }, []);

  return (status == "GAME") ? (
    <Navigate to="/game" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default RequireStatus;
