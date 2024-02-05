import { serverReq } from "../../API/utils/axiosConfig";

const getProfile = async (urlName: string, type: ResultsItemTypes) => {
  try {
    const res = await serverReq.get(`/profiles`, {
      params: { urlMapping: urlName, type },
    });
    return res.data;
  } catch (err: any) {
    console.error("Error fetching user profile:", err);
    throw err;
  }
};

export { getProfile };
