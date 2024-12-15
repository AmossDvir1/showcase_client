import React from "react";
import Typography from "../../../components/sharedComponents/Typography";
import { Switch } from "../../../components/sharedComponents/Switch";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { setThemeMode } from "../../../redux/slices/themeSlice";

const GeneralSettings: React.FC = () => {
  const dispatch = useAppDispatch(); // Get dispatch function

  const onThemeSwitchChange = (checked: boolean) => {
    dispatch(setThemeMode(checked ? "dark" : "light")); // Dispatch the action
  };

  return (
    <div className="p-4">
      <Typography variant="h6" className="mb-4 text-black dark:text-black">
        General
      </Typography>
      <div className="flex items-center">
        <Typography>Dark Mode</Typography>
        <Switch
          isDarkLightStyling
          checked={useAppSelector((state) => state.theme.mode) === "dark"}
          onChange={(value: boolean) => onThemeSwitchChange(value)}
        />
      </div>
    </div>
  );
};

export default GeneralSettings;
