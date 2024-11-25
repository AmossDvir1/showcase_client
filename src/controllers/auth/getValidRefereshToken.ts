import axios from "axios";
import { getLocalStorageAuth } from "../../API/utils/localStorageUtils";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const refreshToken = async () => {
  let storedAuth = getLocalStorageAuth();
  if (storedAuth) {
    let accessToken = storedAuth?.accessToken;
    let sessionId = storedAuth?.sessionId;
    const status = await checkToken(accessToken, sessionId);
    if (status) {
      const isTokenExpired = !status?.activated || status.error;
      if (isTokenExpired) {
        const accessData = await requestToken(accessToken, sessionId);
        if (accessData)
        return {
          accessToken: accessData.accessToken,
          sessionId: accessData.sessionId,
          activated: status?.activated,
          error: status?.error,
        };
      }
      return {
        accessToken: storedAuth.accessToken,
        sessionId: storedAuth.sessionId,
        activated: status?.activated,
        error: status?.error,
      };
    }

    return {
      accessToken: "",
      sessionId: "",
      activated: false,
      error: false,
    };
  }
};

const requestToken = async (accessToken: string, sessionId: string) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "X-Session-ID": sessionId,
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true, // Include cookies in the request
    // Authorization: `Bearer ${accessToken}`,
  };
  try {
    const response = await axios.post(
      `${apiBaseUrl}/user/refresh-token`,
      {},
      config
    );
    // Update the access token in the client
    const newAccessData = {
      accessToken: response.data.accessToken,
      sessionId: response.data.sessionId,
    };
    return newAccessData;
  } catch (err) {
    console.error("Error while requesting new refreshToken", err);
    return null;
  }
};

const checkToken = async (accessToken: string, sessionId: string) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Session-ID": sessionId,
      },
      withCredentials: true, // Include cookies in the request
    };
    const response = await axios.get(
      `${apiBaseUrl}/user/check-activation`,
      config
    );
    return { activated: response?.data?.activated, error: false };
  } catch (error) {
    console.error("Error checking activation status:", error);
    return { activated: false, error: true };
  }
};

export { refreshToken };
