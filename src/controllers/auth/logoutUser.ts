import { serverReq } from "../../API/utils/axiosConfig";

export const logout = async () => {
  try {
    const res = await serverReq.post("/user/logout");
    console.log(res);
    return res;
  } catch (err: any) {
    console.error(err);
    return false;
  }
};
