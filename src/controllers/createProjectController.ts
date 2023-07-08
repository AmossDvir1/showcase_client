import { serverReq } from "../API/utils/axiosConfig";

export const createProject = async (projectDetails: object) => {
  try {
    await serverReq.post("http://localhost:3200/", { projectDetails });
    return 0;
  } catch (err) {
    console.error(err);
    return -1;
  }
};
