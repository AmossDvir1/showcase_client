import { serverReq } from "../../API/utils/axiosConfig";

const createPost = async (content: string) => {
  try {
    const res = await serverReq.post("/post/create", { content });
  } catch (err: any) {
    
  }
};

export { createPost };
