import { UserSignUpData } from "./interfaces";
import { serverReq } from "../../API/utils/axiosConfig";

export const signUp = async (data: UserSignUpData) => {
  try {
    const res = await serverReq.post("/user/create", {
      username: data.username,
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    console.log(res);
    return res.data;
  } catch (err: any) {
    console.error(err);
  }
};
