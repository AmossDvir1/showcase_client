import { serverReq } from "../../API/utils/axiosConfig";

const fetchTechnologiesInventory = async () => {
    try {
      const response = await serverReq.get("/technologies/inventory");
      const techs = response?.data?.technologies;
      return techs;
    } catch (err) {
      console.error("Failed to fetch technologies inventory", err);
    }
  };

  export { fetchTechnologiesInventory }