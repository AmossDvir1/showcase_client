import axios, { AxiosInstance } from "axios";

// Create a new Axios instance with baseURL set
const serverReq: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});
serverReq.defaults.withCredentials = true

serverReq.interceptors.request.use(function (config) {
  let authData = localStorage.getItem("auth") || "";
  if (authData && authData !== "") {
    const token = JSON.parse(authData);
    config.headers.Authorization = token ? `Bearer ${token.accessToken}` : "";
    config.withCredentials = true;
  }
  return config;
});

export { serverReq };
