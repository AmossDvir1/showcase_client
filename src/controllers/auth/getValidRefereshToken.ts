import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const refreshToken = async () => {
  let storedAuth = JSON.parse(localStorage.getItem("auth") || "{}");
  let accessToken = storedAuth?.accessToken;
  if (accessToken) {
    const status = await checkToken(accessToken);
    if (status) {
      const isTokenExpired = !status?.activated || status.error;
      if (isTokenExpired) {
        accessToken = await requestToken(accessToken);
        return {
          accessToken,
          activated: status?.activated,
          error: status?.error,
        };
      }
      return {
        accessToken: storedAuth.accessToken,
        activated: status?.activated,
        error: status?.error,
      };
    }
  }
  return {
    accessToken: "",
    activated: false,
    error: false,
  };
};

const requestToken = async (accessToken: string) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true, // Include cookies in the request
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const response = await axios.post(
      `${apiBaseUrl}/user/refresh-token`,
      {},
      config
    );
    // Update the access token in the client
    const newAccessToken = response.data.accessToken;
    return newAccessToken;
  } catch (err) {
    console.error(err);
    return "";
  }
};

const checkToken = async (accessToken: string) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
