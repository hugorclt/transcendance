import React, { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../store";

function RequireId() {
  const [user, setUser] = useAtom(userAtom);
  const location = useLocation();

  return user?.id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireId;
