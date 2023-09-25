import { UserLoginData } from "./interfaces";
import { serverReq } from "../../API/utils/axiosConfig";

export const login = async (data: UserLoginData) => {
  try {
    const res = await serverReq.post("/user/login", {
      username: data.username,
      password: data.password,
    });
    console.log(res);
    return res.data;
  } catch (err: any) {
    console.error(err);
    return false;
  }
};
