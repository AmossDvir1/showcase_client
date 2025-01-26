import React, { useState, useEffect } from "react";
import {
  TextField as MuiTextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Collapse,
  SelectChangeEvent,
} from "@mui/material";
import Typography from "../../../components/sharedComponents/Typography";
import ChipsSelector from "../../../components/sharedComponents/chip/ChipsSelector";
import { showToast } from "../../../utils/toast";
import { updateUserProfileSettings } from "../../../controllers/userSettingsController/profileSettings/updateUserProfileSettings";
import WorkSettings from "./WorkSettings";
import Loader from "../../../components/sharedComponents/Loader";
import CustomButton from "../../../components/sharedComponents/CustomButton";
import debounce from "lodash/debounce";

import GeoSettings from "./GeoSettings";
import { Switch } from "../../../components/sharedComponents/Switch";
import useMediaQuery from "../../../components/responsiveness/useMediaQuery";
import { Chip } from "../../../components/sharedComponents/chip/Chip";
import TechnologiesSelectorV2 from "./TechSelector/TechnologiesSelectorV2";

interface ProfileSettingsProps {
  settings?: IProfileSettings;
  setSettings: React.Dispatch<React.SetStateAction<IProfileSettings>>;
  loading?: boolean;
  onSave: (isAutoSave?: boolean) => Promise<any>;
  loadingSave?: boolean;
  availableTechnologies: Technology[];
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  settings,
  loading = false,
  availableTechnologies,
  onSave,
  loadingSave = false,
  setSettings,
}) => {
  const isMobile = useMediaQuery(500);
  const [workList, setWorkList] = useState<IWork[]>(settings?.work ?? []);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState<boolean>(true);
  const [isAutoSaving, setIsAutoSaving] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<{
    country: string;
    state: string;
    city: string;
  }>(settings?.currentCity ?? { city: "", state: "", country: "" });

  const [selectedTechnologies, setSelectedTechnologies] = useState<
    Technology[]
  >(settings?.technologies ?? []);

  useEffect(() => console.log(selectedTechnologies), [selectedTechnologies]);
  const handleAutoSave = async () => {
    if (!autoSaveEnabled) return;

    setIsAutoSaving(true);
    try {
      await onSave(true); // Trigger the save logic
    } finally {
      setIsAutoSaving(false); // Ensure this is reset even if the save fails
    }
  };

  const debouncedHandleAutoSave = debounce(handleAutoSave, 1000);

  useEffect(() => {
    if (autoSaveEnabled) {
      debouncedHandleAutoSave();
    }
    return () => {
      debouncedHandleAutoSave.cancel();
    };
  }, [settings, autoSaveEnabled, settings?.work]);

  const onBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (settings) {
      setSettings({ ...settings, bio: e.target.value });
    }
  };

  const onRelationshipStatusChange = (e: SelectChangeEvent<string>) => {
    if (settings) {
      setSettings({ ...settings, relationshipStatus: e.target.value });
    }
  };

  const onCurrentCityChange = (currentCity: {
    country: string;
    state: string;
    city: string;
  }) => {
    if (settings) {
      setSettings({ ...settings, currentCity: currentCity });
    }
  };

  useEffect(() => {
    if (workList) {
      setSettings((prev: IProfileSettings) => ({
        ...prev,
        work: workList ?? [],
      }));
    }
    if (selectedTechnologies) {
      setSettings((prev: IProfileSettings) => ({
        ...prev,
        technologies: selectedTechnologies ?? [],
      }));
    }
  }, [workList, selectedTechnologies]);

  const locationList = {
    country: currentCity.country,
    state: currentCity.state,
    city: currentCity.city,
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mb-4">
        <Typography className="text-gray-800 text-center my-6">
          Loading Settings...
        </Typography>
        <Loader size="md"></Loader>
      </div>
    );
  return (
    <>
      <div className="flex justify-between mb-6">
        <Typography className="text-gray-800 text-2xl font-medium mb-6">
          Profile
        </Typography>
        {/* AutoSave Switch */}
        <div className="flex flex-col">
          <div className="flex justify-end">
            <Typography className={`${isMobile ? "text-xs" : ""}`}>
              Auto-save
            </Typography>
          </div>
          <div className="flex items-center justify-between">
            <Collapse orientation="horizontal" in={autoSaveEnabled}>
              <Chip
                className={"w-36"}
                size={isMobile ? "small" : "medium"}
                label={isAutoSaving ? "Saving..." : "Auto-save enabled"}
              ></Chip>
            </Collapse>
            <div className="pl-2 items-center justify-center flex">
              <Switch
                type="autoSave"
                size={isMobile ? "small" : "medium"}
                checked={autoSaveEnabled}
                onChange={setAutoSaveEnabled}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Bio */}
      <MuiTextField
        label="Bio"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={settings?.bio}
        inputProps={{ className: "dark:text-dark-text" }}
        onChange={onBioChange}
        className="mb-6 dark:bg-dark-paper-light dark:text-dark-text"
        placeholder="Tell us about yourself..."
      />

      {/* Relationship Status */}
      <FormControl fullWidth className="mb-6">
        <InputLabel>Relationship Status</InputLabel>
        <Select
          className="dark:text-dark-text"
          MenuProps={{
            disableScrollLock: true,
            autoFocus: false,
            disableAutoFocus: true,
          }}
          label="Relationship Status"
          value={settings?.relationshipStatus}
          onChange={onRelationshipStatusChange}
        >
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="In a Relationship">In a Relationship</MenuItem>
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="It's Complicated">It's Complicated</MenuItem>
        </Select>
      </FormControl>

      {/* Current city */}
      {settings?.currentCity && (
        <FormControl fullWidth className="mb-6">
          <Typography className="text-lg">Current City</Typography>
          <GeoSettings
            currentCity={settings.currentCity}
            setCurrentCity={setCurrentCity}
          />
        </FormControl>
      )}

      {settings?.work && (
        <WorkSettings
          workList={workList}
          setWorkList={setWorkList}
        ></WorkSettings>
      )}

      {/* Programming Languages */}
      <FormControl fullWidth className="mb-6">
        <Typography className="mb-4 text-lg">Programming Languages</Typography>

        <TechnologiesSelectorV2
          availableTechnologies={availableTechnologies ?? []}
          setSelectedTechnologies={setSelectedTechnologies}
          selectedTechnologies={selectedTechnologies}
        ></TechnologiesSelectorV2>

        <div className="pt-6 flex items-center justify-center h-10">
          <Collapse in={!autoSaveEnabled}>
            <CustomButton
              className="mt-2 py-1"
              size="medium"
              variant="outlined"
              loading={loadingSave}
              color="primary"
              onClick={() => onSave(autoSaveEnabled)}
            >
              Save Changes
            </CustomButton>
          </Collapse>
        </div>
      </FormControl>
    </>
  );
};

export default ProfileSettings;
