import { serverReq } from "../../API/utils/axiosConfig";

const getUserPosts = async (profileId: string) => {
  try {
    const res = await serverReq.get(`/post/posts/user/${profileId}`);
    const data = res?.data?.posts;
    return data;
} catch (err: any) {
    console.error(err)
  }
  return false;
};

export { getUserPosts };
