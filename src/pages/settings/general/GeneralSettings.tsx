import React, { useEffect, useState } from "react";
import Typography from "../../../components/sharedComponents/Typography";
import { Switch } from "../../../components/sharedComponents/Switch";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { setThemeMode } from "../../../redux/slices/themeSlice";
import { serverReq } from "../../../API/utils/axiosConfig";
import {
  aiAssistantStatus,
  fetchAiAssistantStatus,
  updateAiAssistantStatus,
} from "../../../redux/slices/aiAssistantSlice";
import AiAssistantInfo from "./AiAssistantInfo";

const GeneralSettings: React.FC = () => {
  const aiEnabled = useAppSelector(aiAssistantStatus);
  const [aiEnabledLocal, setAiEnabledLocal] = useState(aiEnabled); // Local state for optimistic UI

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAiAssistantStatus());
  }, [dispatch]);

  const onAiEnabledClick = async (value: boolean) => {
    // Optimistic UI update
    setAiEnabledLocal(value);

    try {
      // Make API call
      await serverReq.post("/settings/ai", {
        data: { usingAIAssistant: value },
      });

      // Update Redux store
      dispatch(updateAiAssistantStatus(value));
    } catch (error) {
      console.error("Error updating AI assistant status:", error);

      // Revert UI state if API call fails
      setAiEnabledLocal(!value);
    }
  };

  const onThemeSwitchChange = (checked: boolean) => {
    dispatch(setThemeMode(checked ? "dark" : "light")); // Dispatch the action
  };

  return (
    <div className="p-4">
      <Typography variant="h6" className="mb-4 text-black dark:text-black">
        General
      </Typography>
      <div className="pl-6">
      <div className="flex items-center pb-4">
        <Typography>Dark Mode</Typography>
        <Switch
          isDarkLightStyling
          checked={useAppSelector((state) => state.theme.mode) === "dark"}
          onChange={(value: boolean) => onThemeSwitchChange(value)}
        />
      </div>
      <div className="flex items-center">
        <Typography>Enable Showcase AI</Typography>
        <Switch isAIStyling checked={aiEnabledLocal} onChange={onAiEnabledClick} />
        <AiAssistantInfo />
      </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
