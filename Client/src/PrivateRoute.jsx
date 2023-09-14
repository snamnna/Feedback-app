import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = !!token;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
