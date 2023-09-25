import { serverReq } from "../../API/utils/axiosConfig";

const createPost = async (content: string) => {
  try {
    const res = await serverReq.post("/post/create", { content });
    return res;
  } catch (err: any) {
    console.error(err);
  }
  return false;
};

export { createPost };
