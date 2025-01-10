import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ element }) => {
  const { session } = useSelector(({ session }) => ({
    session,
  }));

  return session.access_token ? (
    element || <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};
