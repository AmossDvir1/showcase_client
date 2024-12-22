import { serverReq } from "../../API/utils/axiosConfig";

const getConversationsPreviews = async (
): Promise<ChatPreview[]> => {
  try {
    const res = await serverReq.get("/chats/previews", {
    });
    return res.data.previews;
  } catch (err: any) {
    throw err;
  }
};

export { getConversationsPreviews };
