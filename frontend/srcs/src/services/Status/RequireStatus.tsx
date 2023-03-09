import React, { useContext, useEffect, useRef } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { useGlobal } from "../Global/GlobalProvider";
import { SocketContext } from "../Auth/SocketContext";

function RequireStatus() {
  const { status, setStatus } = useGlobal();
  const socket = useContext(SocketContext);
  const location = useLocation();
  const querySent = useRef(false);
  const axiosPrivate = useAxiosPrivate();

  function updateSelfStatus(status: string) {
    console.log("updating self status with status: ", status);
    setStatus(status);
  }

  useEffect(() => {
    if (!querySent.current) {
      axiosPrivate
        .get("/users/status")
        .then((res: AxiosResponse) => {
          console.log("on component mount, status is: ", res.data.status);
          setStatus(res.data.status);
        })
        .catch((err: AxiosError) => {
          console.log(JSON.stringify(err));
        });
      querySent.current = true;
    }
  }, []);

  useEffect(() => {
    socket?.on("on-self-status-update", (newStatus) => {
      updateSelfStatus(newStatus);
    });

    return () => {
      socket?.off("on-self-status-update");
    };
  }, [socket]);

  return status == "GAME" ? (
    <Navigate to="/game" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default RequireStatus;
