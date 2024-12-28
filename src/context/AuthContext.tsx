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
  accessToken: null,
  isAuthenticated: false,
  isActivated: false,
  checkFinished: false,
  logout: async () => {},
  login: async (username: string, password: string) => {},
  setAccessToken: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isActivated: false,
    checkFinished: false,
  });

  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const userInfoStatus = useSelector((state: RootState) => state.user.status);

  useEffect(() => {
    if (
      authState.isAuthenticated &&
      authState.isActivated &&
      !userInfo &&
      userInfoStatus !== "loading"
    ) {
      dispatch(fetchUserInfo());
    }
  }, [
    authState.isActivated,
    authState.isAuthenticated,
    userInfo,
    userInfoStatus,
    dispatch,
  ]);

  const checkActivationStatus = async (token: string) => {
    try {
      const response = await serverReq.get("/user/check-activation", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const isActivated = response.data.activated;
      setAuthState((prev) => ({
        ...prev,
        isActivated,
        isAuthenticated: true, // Set isAuthenticated only when activation check is successful
      }));
    } catch (error) {
      console.error("Error checking activation:", error);
      setAuthState((prev) => ({
        ...prev,
        isActivated: false,
        isAuthenticated: false,
      }));
    }
  };

  useEffect(() => {
    const initializeAuthState = async () => {
      setAuthState((prev) => ({ ...prev, checkFinished: false })); // Reset checkFinished

      const authData = getLocalStorageAuth();
      if (authData?.accessToken) {
        const token = authData.accessToken;
        setAccessToken(token);
        await checkActivationStatus(token);
      } else {
        setAccessToken(null);
        localStorage.removeItem("auth");
        document.cookie =
          "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setAuthState({
          isAuthenticated: false,
          isActivated: false,
          checkFinished: true,
        });
      }

      setAuthState((prev) => ({ ...prev, checkFinished: true }));
    };

    initializeAuthState();
  }, []);

  const logout = async () => {
    try {
      const res = await serverReq.post("/user/logout");
      if (res) {
        localStorage.removeItem("auth");
        setAccessToken(null);
        setAuthState({
          isAuthenticated: false,
          isActivated: false,
          checkFinished: true,
        });
        showToast("Successfully logged out", "Successfully logged out", "success");
      } else {
        showToast("Error during logging out", "Error during logging out", "error");
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
        withCredentials: true,
      };
      const deviceInfo = getDeviceInfo();
      const res = await serverReq.post(
        "/user/login",
        { username, password, deviceInfo },
        config
      );

      if (res?.data?.success && res?.data?.accessToken && res?.data?.sessionId) {
        showToast("Successfully Logged In", "Login Success", "success");
        saveToLocalStorage("auth", {
          accessToken: res.data.accessToken,
          sessionId: res.data.sessionId,
        });
        setAccessToken(res.data.accessToken);
        await checkActivationStatus(res.data.accessToken); // Ensure activation status is updated after login
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        accessToken,
        logout,
        login,
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
