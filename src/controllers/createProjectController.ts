import axios from "axios";

export const createProject = async (projectDetails: object) => {
  console.log("ijoijoijojo");
  try {
    await axios.post("http://localhost:3200/", { projectDetails });
    return 0;
  } catch (err) {
    return -1;
  }
};