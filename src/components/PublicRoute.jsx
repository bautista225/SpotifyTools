import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = ({ element }) => {
  const { session } = useSelector(({ session }) => ({
    session,
  }));

  return session.access_token ? (
    <Navigate to="/" replace />
  ) : (
    element || <Outlet />
  );
};
