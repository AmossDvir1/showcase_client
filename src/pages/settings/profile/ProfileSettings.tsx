import React, { useState, useEffect } from "react";
import {
  TextField as MuiTextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import Typography from "../../../components/sharedComponents/Typography";
import ChipsSelector from "../../../components/sharedComponents/ChipsSelector";
import { showToast } from "../../../utils/toast";
import { fetchTechnologiesInventory } from "../../../controllers/technologiesController/fetchTechnologiesInventory";
import { updateUserProfileSettings } from "../../../controllers/userSettingsController/profileSettings/updateUserProfileSettings";
import { Button } from "../../../components/sharedComponents/Button";
import WorkSettings from "./WorkSettings";
import Loader from "../../../components/sharedComponents/Loader";
import CustomButton from "../../../components/sharedComponents/CustomButton";

import GeoSettings from "./GeoSettings";
import { City, Country, State } from "react-country-state-city/dist/esm/types";

interface ProfileSettingsProps {
  initialSettings?: IProfileSettings;
  loading?: boolean;
}

const defaultSettings = {
  bio: "",
  relationshipStatus: "",
  technologies: [],
  work: [],
  currentCity: { country: "", state: "", city: "" },
};

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  initialSettings = defaultSettings,
  loading = false,
}) => {
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [bio, setBio] = useState<string>(initialSettings?.bio ?? "");
  const [workList, setWorkList] = useState<IWork[]>(
    initialSettings?.work ?? []
  );
  const [currentCity, setCurrentCity] = useState<{
    country: Country | string;
    state: State | string;
    city: City | string;
  }>(initialSettings?.currentCity ?? { city: "", state: "", country: "" });
  const [relationshipStatus, setRelationshipStatus] = useState<string>(
    initialSettings?.relationshipStatus ?? ""
  );
  const [availableTechnologies, setAvailableTechnologies] = useState<
    ChipItem[]
  >([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<ChipItem[]>(
    initialSettings?.technologies ?? []
  );

  useEffect(() => {
    const fetchAvailableTechnologies = async () => {
      try {
        const techs = await fetchTechnologiesInventory();
        if (techs) {
          setAvailableTechnologies(techs);
        }
      } catch (err) {
        console.error("Failed to fetch technologies inventory", err);
      }
    };

    fetchAvailableTechnologies();
  }, []);

  useEffect(() => {
    if (initialSettings) {
      setRelationshipStatus(initialSettings.relationshipStatus ?? "");
      setBio(initialSettings.bio ?? "");
      setWorkList(initialSettings.work ?? []);
      setSelectedTechnologies(initialSettings.technologies ?? []);
    }
  }, [initialSettings]);

  const updateProfileSettings = async () => {
    try {
      setIsSaveLoading(true);
      const res = await updateUserProfileSettings({
        technologies: selectedTechnologies,
        bio,
        work: workList,
        relationshipStatus,
        currentCity: {
          city: currentCity.city.toString(),
          state: currentCity.state.toString(),
          country: currentCity.country.toString(),
        },
      });
      showToast("Settings Saved Successfully", "Save Success", "success");
      return res.data;
    } catch (err) {
      console.log(err);
    } finally {
      setIsSaveLoading(false);
    }
  };

  // Handle form submissions
  const onSave = () => {
    updateProfileSettings();
  };
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
    <Box className="flex flex-col p-4 bg-gray-50 dark:bg-dark-paper rounded-md shadow-md">
      <Typography
        variant="h5"
        className="mb-6 text-primary flex items-center justify-center"
      >
        Edit Profile Settings
      </Typography>

      {/* Bio */}
      <MuiTextField
        label="Bio"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={bio}
        inputProps={{ className: "dark:text-dark-text" }}
        onChange={(e) => setBio(e.target.value)}
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
          value={relationshipStatus}
          onChange={(e) => setRelationshipStatus(e.target.value)}
        >
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="In a Relationship">In a Relationship</MenuItem>
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="It's Complicated">It's Complicated</MenuItem>
        </Select>
      </FormControl>

      {/* Current city */}
      <FormControl fullWidth className="mb-6">
        <Typography className="text-lg">Current City</Typography>
        <GeoSettings
          currentCity={currentCity}
          setCurrentCity={setCurrentCity}
        />
      </FormControl>

      <WorkSettings
        workList={workList}
        setWorkList={setWorkList}
      ></WorkSettings>

      {/* Programming Languages */}
      <FormControl fullWidth className="mb-6">
        <Typography className="mb-4 text-lg">Programming Languages</Typography>

        <ChipsSelector
          setSelectedChips={setSelectedTechnologies}
          selectedChips={selectedTechnologies}
          availableChips={availableTechnologies ?? []}
        ></ChipsSelector>
      </FormControl>

      {/* Save Button */}
      <CustomButton
        className="mt-2 py-1"
        size="medium"
        variant="outlined"
        loading={isSaveLoading}
        color="primary"
        fullWidth
        onClick={onSave}
      >
        Save Changes
      </CustomButton>
    </Box>
  );
};

export default ProfileSettings;
