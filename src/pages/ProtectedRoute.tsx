import React from "react";
import { Navigate, RouteProps, Outlet } from "react-router-dom";
import { useAuth } from "../controllers/auth/useAuth";

interface ActivationProps {
  checkActivation?: boolean;
}

const ProtectedRoute: React.FC<RouteProps & ActivationProps> = ({checkActivation=true}) => {
  const auth = useAuth();

  if (!auth?.isAuthenticated && auth?.checkFinished) {
    return <Navigate to="/login" />;
  }
  if (checkActivation && !auth?.isActivated && auth?.checkFinished) {
    return <Navigate to="/user-activation" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
