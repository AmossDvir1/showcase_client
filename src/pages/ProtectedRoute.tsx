import React from "react";
import { Navigate, RouteProps, Outlet } from "react-router-dom";
import { useAuth } from "../controllers/auth/useAuth";

const ProtectedRoute: React.FC<RouteProps> = () => {
  const auth = useAuth();

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
