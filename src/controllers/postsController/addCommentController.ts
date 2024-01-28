import { serverReq } from "../../API/utils/axiosConfig";

const addComment = async (postId: string, commentString:string) => {
    try {
      const res = await serverReq.put(`/post/comment/${postId}`, {content: commentString});
      return res;
    } catch (err: any) {
      console.error("Error liking post:", err);
     throw err;
    }
  };

export { addComment };
