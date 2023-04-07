import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../store";

function RequireUnAuth() {
  const [user, setUser] = useAtom(userAtom);
  const location = useLocation();

  return user?.accessToken ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default RequireUnAuth;
