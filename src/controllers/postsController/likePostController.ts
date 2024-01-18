import { serverReq } from "../../API/utils/axiosConfig";

const likePost = async (postId: string) => {
    try {
      const res = await serverReq.put(`/post/like/${postId}`);
      return res;
    } catch (err: any) {
      console.error("Error liking post:", err);
     throw err;
    }
  };

export { likePost };
