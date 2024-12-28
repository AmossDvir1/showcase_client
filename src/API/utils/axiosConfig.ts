import axios, { AxiosInstance } from "axios";
import { showToast } from "../../utils/toast";
import {
  ACCESS_TOKEN_EXPIRED,
  REFRESH_TOKEN_EXPIRED,
  ERRORS_TO_DISPLAY,
} from "../../utils/constants";
import { getLocalStorageAuth, saveToLocalStorage } from "./localStorageUtils";
import { refreshToken } from "../../controllers/auth/getValidRefereshToken";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// Create a new Axios instance with baseURL set
const serverReq: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-type": "application/json",
  },
});
serverReq.defaults.withCredentials = true;

// Add an interceptor to handle 401 errors
serverReq.interceptors.response.use(
  (response) => response,
  async (error) => {
    const data = error?.response?.data;
    console.log(error);

    if (data?.error === ACCESS_TOKEN_EXPIRED) {
      // Handle post-login request with an expired token
      // Send a request for a refresh token
      try {
        const newRefreshTokenData = await refreshToken();
        const newAccessToken = newRefreshTokenData?.accessToken;
        const sessionId = getLocalStorageAuth()?.sessionId;

        if (!newAccessToken || newAccessToken === "" || !sessionId) {
          localStorage.removeItem("auth");
          window.location.reload();
          return Promise.reject(error);
        }
        saveToLocalStorage("auth", { accessToken: newAccessToken, sessionId });
        // Update the stored access token with the new one

        // Retry the original request with the updated access token
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers["X-Session-ID"] = sessionId;
        return axios(originalRequest);
      } catch (error) {
        if (ERRORS_TO_DISPLAY.includes(data?.error)) {
          showToast(data?.message || "Error", "Error", "error");
        }

        // Handle refresh token request failure
        // Display error message, logout user, etc.
      }
      localStorage.removeItem("auth");
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } else if (data?.error === REFRESH_TOKEN_EXPIRED) {
      localStorage.removeItem("auth");
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
    }

    // Check if it's an invalid login request
    else if (ERRORS_TO_DISPLAY.includes(data?.error)) {
      showToast(error?.response?.data?.message || "Error", "Error", "error");
    } else {
    }
    return Promise.reject(error);
  }
);

serverReq.interceptors.request.use((response) => {
  const authData = getLocalStorageAuth();
  if (authData) {
    response.headers["X-Session-ID"] = authData.sessionId;
    response.headers.Authorization = `Bearer ${authData.accessToken}`;
    response.withCredentials = true;
  }
  return response;
});

export { serverReq };
