import { serverReq } from "../../API/utils/axiosConfig";

const sendValidationEmail = async () => {
  try {
    const res = await serverReq.post("/user/email-verification", {});
    console.log(res);
    return res.data;
  } catch (err: any) {
    console.error(err);
    return false;
  }
};

const activateUserWithOtp = async (otp: string) => {
  try {
    const res = await serverReq.put("/user/activate-user", { otp });
    console.log(res);
    return res.data;
  } catch (err: any) {
    console.error(err);
  }
};

export { sendValidationEmail, activateUserWithOtp };
