import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import { lobbyAtom, userAtom } from "../store";

function RequireInGameStatus() {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const location = useLocation();

  return lobby?.state == "GAME" ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default RequireInGameStatus;
