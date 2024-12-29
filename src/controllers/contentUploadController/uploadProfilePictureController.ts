import { serverReq } from "../../API/utils/axiosConfig";

const uploadProfilePicture = async (
  imageStringBase64: string,
  userId: string,
  filename: string,
  purpose: ImagePurpose,
  imageOffset?: ImageOffset,
  dimensions?: ImageDimensions
) => {
  try {
    const res = await serverReq.post(`/profiles/upload/${purpose}`, {
      data: { imageStringBase64, userId, filename, imageOffset, dimensions },
    });
    return res;
  } catch (err: any) {
    throw err;
  }
};
export { uploadProfilePicture };
