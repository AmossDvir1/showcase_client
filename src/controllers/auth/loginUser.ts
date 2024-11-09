import { UserLoginData } from "./interfaces";
import { serverReq } from "../../API/utils/axiosConfig";

export const login = async (data: UserLoginData) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true, // Include cookies in the request
    };
    const res = await serverReq.post("/user/login", {
      username: data.username,
      password: data.password,
    }, config);
    console.log(res);
    return res.data;
  } catch (err: any) {
    console.error(err);
    return false;
  }
};
