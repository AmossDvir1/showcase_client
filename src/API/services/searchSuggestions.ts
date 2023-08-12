import { serverReq } from "../utils/axiosConfig";

const getSearchSuggestions = async (searchQuery: string) => {
  try {
    const res = await serverReq.get(`/search/suggestions?q=${searchQuery}`);

    return res?.data || [];
  } catch (err: any) {
    console.error(err);
    return [];
  }
};

export { getSearchSuggestions };
