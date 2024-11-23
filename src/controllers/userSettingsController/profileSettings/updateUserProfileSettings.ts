import { serverReq } from "../../../API/utils/axiosConfig";

const updateUserProfileSettings = async (profileSettings: IProfileSettings) => {
  try {
    const settings = {
      ...profileSettings,
      technologies: profileSettings.technologies?.map(tech => tech._id) ?? undefined,
    };

    const res = await serverReq.put(`/settings`, {
      data: { profile: settings },
    });
    return res.data;
  } catch (err: any) {
    console.error("Error updating user settings:", err);
    throw err;
  }
};

export { updateUserProfileSettings };
