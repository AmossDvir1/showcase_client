import React from "react";
import { Route, Navigate } from "react-router-dom";
import {useAuth} from "../controllers/auth/useAuth";

interface ProtectedRouteProps {
  path: string;
  children: React.ReactNode;
}

function ProtectedRoute({ children, path }: ProtectedRouteProps) {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Route path={path}>{children}</Route>;
}

export default ProtectedRoute;
