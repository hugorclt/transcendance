import React, { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../store";

function RequireAuth() {
  const [user, setUser] = useAtom(userAtom);
  const location = useLocation();

  console.log("guards", user?.accessToken);
  return user?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
