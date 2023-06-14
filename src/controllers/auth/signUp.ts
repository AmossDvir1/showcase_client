import axios from "axios";
import { UserSignUpData } from "./interfaces";

export const signUp = async (data: UserSignUpData) => {
  try {
    const res = await axios.post(
      process.env.REACT_APP_API_BASE_URL + "/user/create",
      {
        username: data.username,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      }
    );
    console.log(res);
    return res.data;
  } catch (err: any) {
    console.error(err);
  }
};
