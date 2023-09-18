import React, { useEffect, useState } from "react";
import { useAuth } from "../../controllers/auth/useAuth";
import { showToast } from "../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { setActivationToastShown } from "../../redux/slices/globalState";

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
  const [isActivatedChecked, setIsActivatedChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      checkActivation &&
      auth?.isAuthenticated &&
      !auth?.isActivated &&
      !isActivatedChecked &&
      !globalActivationToastShown
    ) {
      showToast("Account is Not Activated", "", "warning");
      setIsActivatedChecked(true);
      dispatch(setActivationToastShown(true));
    }
  }, [checkActivation, auth?.isActivated, isActivatedChecked]);

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
