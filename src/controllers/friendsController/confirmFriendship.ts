import { serverReq } from "../../API/utils/axiosConfig";

const confirmFriendship = async (senderId: string) => {
  try {
    const res = await serverReq.put("/friends/confirm", {
        senderId,
    });
    return res.data;
  } catch (err: any) {
    return false;
  }
};

export { confirmFriendship };
