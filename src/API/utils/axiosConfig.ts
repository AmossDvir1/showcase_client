import axios, { AxiosInstance } from "axios";

// Create a new Axios instance with baseURL set
export const serverReq: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
