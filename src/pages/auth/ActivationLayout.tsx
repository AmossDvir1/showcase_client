import React from "react";
import { useAuth } from "../../context/AuthContext";
import UserActivation from "./UserActivation";
import UserAlreadyActivated from "./UserAlreadyActivated";
import { Navigate } from "react-router-dom";

const ActivationLayout: React.FC = () => {
  const auth = useAuth();

  if (auth?.checkFinished) {
    if (auth?.isAuthenticated) {
      if (auth?.isActivated) {
        return <UserAlreadyActivated></UserAlreadyActivated>;
      } else {
        return <UserActivation></UserActivation>;
      }
    } else {
      return <Navigate to="/" replace />;
    }
  } else {
    return <></>;
  }
};

export default ActivationLayout;
