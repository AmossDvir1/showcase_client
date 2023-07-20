import React, { createContext, useContext, useState, useEffect } from "react";
import { serverReq } from "../../API/utils/axiosConfig";

interface AuthContextValue {
  isAuthenticated: boolean;
  isActivated: boolean;

  setIsAuthenticated: (value: boolean) => void;
  setIsActivated: (value: boolean) => void;

  checkFinished: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  isActivated: false,

  setIsAuthenticated: () => {},
  setIsActivated: () => {},

  checkFinished: false,
});

const checkActivationStatus = async () => {
  // Implement your activation status check logic here
  // For example, make an API call to fetch the activation status
  // and return the result as a boolean value
  try {
    const response = await serverReq.get("/user/check-activation");
    return { activated: response?.data?.activated, error: false };
  } catch (error) {
    console.error("Error checking activation status:", error);
    return { activated: false, error: true };
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [reqFinished, setReqFinished] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("auth")
  );
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const checkActivation = async () => {
      const authData = localStorage.getItem("auth");
      if (authData) {
        const res = await checkActivationStatus();
        
        if (res && !res.error) {
          setIsAuthenticated(true);
          setIsActivated(res.activated);
        } else {
          setIsAuthenticated(false);
        }
      }
      setReqFinished(true);
    };
    checkActivation();
  }, [localStorage.getItem("auth")]);

  return (
    <AuthContext.Provider
      value={
        reqFinished
          ? {
              isAuthenticated,
              isActivated,
              setIsAuthenticated,
              setIsActivated,
              checkFinished: true,
            }
          : {
              isAuthenticated: false,
              isActivated: false,
              setIsAuthenticated,
              setIsActivated,
              checkFinished: false,
            }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
