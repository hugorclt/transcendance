import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../store";

function RequireInGameStatus() {
  const [user, setUser] = useAtom(userAtom);
  const location = useLocation();

  return user.status == "GAME" ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default RequireInGameStatus;
