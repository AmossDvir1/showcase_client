import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { showToast } from "../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { setActivationToastShown } from "../redux/slices/globalState";

interface ProtectedComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  checkActivation?: boolean;
}

const ProtectedComponent = ({
  children,
  fallback,
  checkActivation = true,
}: ProtectedComponentProps) => {
  const globalActivationToastShown = useSelector(
    (state: RootState) => state.globalState.isActivationToastShown
  );
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      checkActivation &&
      auth.checkFinished &&
      !!auth?.isAuthenticated &&
      !auth?.isActivated &&
      !globalActivationToastShown
    ) {
      showToast("Account is Not Activated", "", "warning");
      dispatch(setActivationToastShown(true));
    }
  }, [
    checkActivation,
    auth?.isActivated,
    auth?.checkFinished,
    auth?.isAuthenticated,
    dispatch,
  ]);

  if (auth?.checkFinished) {
    if (!auth?.isAuthenticated) {
      if (fallback) {
        return <>{fallback}</>;
      } else {
        return <></>;
      }
    } else if (checkActivation && !auth?.isActivated) {
      if (fallback) {
        return <>{fallback}</>;
      } else {
        return <></>;
      }
    }
    return <>{children}</>;
  } else {
    return <></>;
  }
};

export default ProtectedComponent;
