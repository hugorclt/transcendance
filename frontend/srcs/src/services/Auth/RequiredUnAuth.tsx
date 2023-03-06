import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../Global/GlobalProvider";

function RequireUnAuth() {
  const { auth } = useGlobal();
  const location = useLocation();

  return auth?.accessToken ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default RequireUnAuth;
