import { serverReq } from "../../API/utils/axiosConfig";

const deletePost = async (postId: string) => {
  try {
    const res = await serverReq.delete(`/post/${postId}`);
  } catch (err: any) {
    console.error(err);
  }
};

export { deletePost };
