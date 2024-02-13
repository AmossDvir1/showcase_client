import { useState, useEffect } from "react";
import { serverReq } from "./utils/axiosConfig";

const useFetchProjectSlots = (): {projectSlots: ProjectSlotDetails[], loading: boolean} => {
  const [projectSlots, setProjectSlots] = useState<ProjectSlotDetails[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProjectSlots = async () => {
      setLoading(true);
      const response = await serverReq.get("/project/projects_previews");
      setLoading(false);
      setProjectSlots(response.data.projects);
    };

    fetchProjectSlots();
  }, []);

  return {projectSlots: projectSlots ?? [], loading};
};

export default useFetchProjectSlots;
