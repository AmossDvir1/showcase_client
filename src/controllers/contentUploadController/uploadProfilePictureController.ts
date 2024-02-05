import { serverReq } from "../../API/utils/axiosConfig";

const uploadProfilePicture = async (imageStringBase64: string, userId: string, filename: string) => {
  try {
    const res = await serverReq.post("/profiles/upload/profile-picture", {data: {imageStringBase64, userId, filename}});
    return res;
  } catch (err: any) {
    throw err;
  }
};
export { uploadProfilePicture };
