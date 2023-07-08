import { useState, useEffect } from "react";
import { serverReq } from "./utils/axiosConfig";

function useFetchProjectSlots(): ProjectSlotDetails[] {
  const [projectSlots, setProjectSlots] = useState<ProjectSlotDetails[] | null>(
    null
  );

  useEffect(() => {
    const fetchProjectSlots = async () => {
      const response = await serverReq.get(
        process.env.REACT_APP_API_BASE_URL + "/project/projects_previews"
      );
      setProjectSlots(response.data);
    };

    fetchProjectSlots();
  }, []);

  return projectSlots ?? [];
}

export default useFetchProjectSlots;
