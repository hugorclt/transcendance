import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../Global/GlobalProvider";

function RequireInGameStatus() {
  const { status } = useGlobal();
  const location = useLocation();

  return (status == "GAME") ? (
      <Outlet />
      ) : (
      <Navigate to="/" state={{ from: location }} replace />
  );
}

export default RequireInGameStatus;
