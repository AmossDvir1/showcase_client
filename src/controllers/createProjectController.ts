import axios from "axios";

export const createProject = async (projectDetails: object) => {
  try {
    await axios.post("http://localhost:3200/", { projectDetails });
    return 0;
  } catch (err) {
    console.error(err);
    return -1;
  }
};
