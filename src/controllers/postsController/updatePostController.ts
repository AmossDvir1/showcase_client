import { serverReq } from "../../API/utils/axiosConfig";

const updatePost = async (content: string, postId: string) => {
  try {
    const res = await serverReq.put(`/post/${postId}`, { content });
    return res;
  } catch (err: any) {
    throw err;
  }
};

export { updatePost };
