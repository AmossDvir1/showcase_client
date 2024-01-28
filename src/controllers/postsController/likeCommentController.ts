import { serverReq } from "../../API/utils/axiosConfig";

const likeComment = async (postId: string, commentId: string) => {
    try {
      const res = await serverReq.put(`/post/like/${postId}/${commentId}`);
      return res;
    } catch (err: any) {
      console.error("Error liking comment:", err);
     throw err;
    }
  };

export { likeComment };
