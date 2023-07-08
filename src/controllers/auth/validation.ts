import axios from "axios";
import { serverReq } from "../../API/utils/axiosConfig";

const sendValidationEmail = async () => {
  try {
    const res = await serverReq.post(
      process.env.REACT_APP_API_BASE_URL + "/user/email_verification",
      {}
    );
    console.log(res);
    return res.data;
  } catch (err: any) {
    console.error(err);
  }
};

const activateUserWithOtp = async (otp: string) => {
  try {
    const res = await serverReq.put(
      process.env.REACT_APP_API_BASE_URL + "/user/activate_user",
      {
        otp,
      }
    );
    console.log(res);
    return res.data;
  } catch (err: any) {
    console.error(err);
  }
};

export { sendValidationEmail, activateUserWithOtp };
