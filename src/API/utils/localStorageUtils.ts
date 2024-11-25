const saveToLocalStorage = (key: string, data: any) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error: any) {
    console.error(error);
  }
};

const getLocalStorageAuth = (): {
  accessToken: string;
  sessionId: string;
} | null => {
  let parsedData = null;
  const authData = localStorage?.getItem("auth");
  if (authData) {
    try {
      parsedData = JSON.parse(authData);
      if (
        typeof parsedData === "object" &&
        parsedData !== null &&
        parsedData?.sessionId &&
        parsedData?.accessToken &&
        parsedData?.sessionId !== "" &&
        parsedData?.accessToken !== ""
      ) {
        return parsedData;
      } else {
        return null;
      }
    } catch (err: any) {
      console.error("Error while parsing localStorage auth data: ", err);
      return null;
    }
  } else {
    return null;
  }
};

export { saveToLocalStorage, getLocalStorageAuth };
