import { serverReq } from "../API/utils/axiosConfig";

export const createProject = async (projectDetails: object) => {
  try {
    await serverReq.post("/project/create_post", { projectDetails });
    return 0;
  } catch (err) {
    console.error(err);
    return -1;
  }
};
