import React from "react";
import { Navigate, RouteProps, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ActivationProps {
  checkActivation?: boolean;
}

const ProtectedRoute: React.FC<RouteProps & ActivationProps> = ({
  checkActivation = true,
}) => {
  const { isAuthenticated, checkFinished, isActivated } = useAuth();

  if (!isAuthenticated && checkFinished) {
    return <Navigate to="/login" />;
  }
  if (checkActivation && isAuthenticated && !isActivated && checkFinished) {
    return <Navigate to="/user-activation" />;
  }
  if (checkFinished && isAuthenticated && isActivated) {
    return <Outlet />;
  }
  return <></>;
};

export default ProtectedRoute;
