import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../Global/GlobalProvider";

function RequireAuth() {
  const { auth } = useGlobal();
  const location = useLocation();

  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
