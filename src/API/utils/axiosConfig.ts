import axios, { AxiosInstance } from "axios";
import { showToast } from "../../utils/toast";
import { ACCESS_TOKEN_EXPIRED, ERRORS_TO_DISPLAY } from "../../utils/constants";

// Create a new Axios instance with baseURL set
const serverReq: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});
serverReq.defaults.withCredentials = true;

// Add an interceptor to handle 401 errors
serverReq.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { data } = error.response;
    console.log(error);

    if (data?.error === ACCESS_TOKEN_EXPIRED) {
      // Handle post-login request with an expired token
      // Send a request for a refresh token
      try {
        const response = await axios.get("/refresh-token");
        // Update the access token in the client
        const newAccessToken = response.data.accessToken;
        // Update the stored access token with the new one

        // Retry the original request with the updated access token
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token request failure
        // Display error message, logout user, etc.
      }
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
  let authData = localStorage.getItem("auth") || "";
  if (authData && authData !== "") {
    const token = JSON.parse(authData);
    response.headers.Authorization = token ? `Bearer ${token.accessToken}` : "";
    response.withCredentials = true;
  }
  return response;
});

export { serverReq };
