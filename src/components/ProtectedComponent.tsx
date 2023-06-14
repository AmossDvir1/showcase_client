import React from "react";
import { useAuth } from "../controllers/auth/useAuth";

interface ProtectedComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function ProtectedComponent({ children, fallback }: ProtectedComponentProps) {
  const isAuthenticated = useAuth();

  if (!isAuthenticated.isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    } else {
      return <></>;
    }
  }

  return <>{children}</>;
}

export default ProtectedComponent;
