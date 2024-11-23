import { serverReq } from "../../../API/utils/axiosConfig";

const getUserSettings = async (): Promise<IUserSettings> =>  {
  try {
    const res = await serverReq.get(`/settings`);
    return res?.data?.settings;
  } catch (err: any) {
    console.error("Error fetching user settings:", err);
    throw err;
  }
};

export { getUserSettings };
