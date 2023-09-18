import { serverReq } from "../API/utils/axiosConfig";

export const createProject = async (projectDetails: object) => {
  try {
    await serverReq.post("/project/create_post", { projectDetails });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
