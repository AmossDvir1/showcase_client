import { serverReq } from "../utils/axiosConfig";

const getSearchItems = async (searchQuery: string) => {
  try {
    const res = await serverReq.get(`/api/search?q=${searchQuery}`);

    return res?.data || [];
  } catch (err: any) {
    console.error(err);
    return [];
  }
};

export { getSearchItems };
