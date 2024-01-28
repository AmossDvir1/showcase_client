import { serverReq } from "../../API/utils/axiosConfig";

const getMyPosts = async () => {
  try {
    const res = await serverReq.get("/post/posts/me");
    const data = res?.data?.posts;
    return data;
} catch (err: any) {
    console.error(err)
  }
  return false;
};

export { getMyPosts };
