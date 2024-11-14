import React, { createContext, useContext, useEffect, useState } from "react";
import { serverReq } from "../API/utils/axiosConfig";
import { showToast } from "../utils/toast";
import { saveToLocalStorage } from "../API/utils/saveToLocalStorage";

interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  isActivated: boolean;
  checkFinished: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: "",
  isAuthenticated: false,
  isActivated: false,
  checkFinished: false,
  logout: async () => {},
  login: async (username: string, password: string) => {},
  setAccessToken: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [checkFinished, setCheckFinished] = useState(false);

  const checkActivationStatus = async (token: string) => {
    try {
      const response = await serverReq.get("/user/check-activation", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsActivated(response.data.activated);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error checking activation:", error);
      setIsActivated(false);
      setIsAuthenticated(false);
    }
  };

  // Initial load effect to set auth state and check activation
  useEffect(() => {
    const authData = localStorage.getItem("auth");
    let parsedTokenData = null;
    if (authData) {
      parsedTokenData = JSON.parse(authData);
    }
    const token = parsedTokenData?.accessToken || null;
    setAccessToken(token);
  }, [accessToken, isAuthenticated, isActivated]);

  useEffect(() => {
    const initializeAuthState = async () => {
      const storedAuthData = localStorage.getItem("auth");
      if (storedAuthData) {
        const parsedData = JSON.parse(storedAuthData);
        const token = parsedData?.accessToken || null;

        if (token) {
          setAccessToken(token);
          await checkActivationStatus(token);
          setIsAuthenticated(true);
        }
      }

      setCheckFinished(true); // Set checkFinished to true only after initializing state
    };

    initializeAuthState();
  }, []);

  const logout = async () => {
    try {
      const res = await serverReq.post("/user/logout");
      if (res) {
        localStorage.removeItem("auth");
        setIsAuthenticated(false);
        showToast(
          "Successfully logged out",
          "Successfully logged out",
          "success"
        );
      } else {
        showToast(
          "Error during logging out",
          "Error during logging out",
          "error"
        );
      }
    } catch (err: any) {
      console.error(err);
    }
  };
  const login = async (username: string, password: string) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true, // Include cookies in the request
      };
      const res = await serverReq.post(
        "/user/login",
        {
          username,
          password,
        },
        config
      );

      if (res && res?.data?.success) {
        showToast("Successfully Logged In", "Login Success", "success");
        saveToLocalStorage("auth", {
          accessToken: res?.data?.accessToken,
        });
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        checkFinished,
        accessToken,
        logout,
        login,
        isActivated,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider };
