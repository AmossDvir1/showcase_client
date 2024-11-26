import React, { createContext, useContext, useEffect, useState } from "react";
import { serverReq } from "../API/utils/axiosConfig";
import { showToast } from "../utils/toast";
import {
  getLocalStorageAuth,
  saveToLocalStorage,
} from "../API/utils/localStorageUtils";
import { AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { fetchUserInfo } from "../redux/slices/user";
import { getDeviceInfo } from "../utils/utils";


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

  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const userInfoStatus = useSelector((state: RootState) => state.user.status);

  useEffect(() => {
    // Dispatch the async action to fetch user info only if it's not already present
    if (
      !userInfo &&
      userInfoStatus !== "loading" &&
      isAuthenticated &&
      isActivated
    ) {
      dispatch(fetchUserInfo());
    }
  }, [
    isActivated,
    isAuthenticated,
    userInfo,
    checkFinished,
    dispatch,
    userInfoStatus,
  ]);

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
    const authData = getLocalStorageAuth();
    if (!authData) {
      setAccessToken(null);
      localStorage.removeItem("auth");
      return;
    }
    const token = authData?.accessToken || null;
    setAccessToken(token);
  }, [accessToken, isAuthenticated, isActivated]);

  useEffect(() => {
    const initializeAuthState = async () => {
      const parsedData = getLocalStorageAuth();
      if (parsedData) {
        const token = parsedData?.accessToken;
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
      const deviceInfo = getDeviceInfo();
      console.log('Device Info:', deviceInfo);

      const res = await serverReq.post(
        "/user/login",
        {
          username,
          password,
          deviceInfo
        },
        config
      );

      if (
        res &&
        res?.data?.success &&
        res?.data?.accessToken !== "" &&
        res?.data?.sessionId !== ""
      ) {
        showToast("Successfully Logged In", "Login Success", "success");
        saveToLocalStorage("auth", {
          accessToken: res?.data?.accessToken,
          sessionId: res?.data?.sessionId,
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
