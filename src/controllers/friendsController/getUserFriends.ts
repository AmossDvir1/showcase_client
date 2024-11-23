import { serverReq } from "../../API/utils/axiosConfig";

const getUserFriendsDetails = async (senderId?: string) => {
  try {
    const res = await serverReq.get(`/friends/friends-list${senderId? `/${senderId}`: ""}`);
    return res;
  } catch (err: any) {
    console.error(err);
  }
};

export { getUserFriendsDetails };
