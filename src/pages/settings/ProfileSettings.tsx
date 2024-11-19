import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
  Typography,
} from "@mui/material";
import ChipsSelector from "../../components/sharedComponents/ChipsSelector";
import { serverReq } from "../../API/utils/axiosConfig";
import { showToast } from "../../utils/toast";

// Mock data for programming languages

const ProfileSettings: React.FC = () => {
  const [bio, setBio] = useState("");
  const [relationshipStatus, setRelationshipStatus] = useState("");
  const [availableTechnologies, setAvailableTechnologies] = useState<ChipItem[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<ChipItem[]>([]);

  useEffect(() => {
    const fetchTechnologiesInventory = async () => {
      try {
        const response = await serverReq.get("/techs/inventory");
        const techs = response?.data?.technologies;
        setAvailableTechnologies(techs);
      } catch (err) {
        console.error("Failed to fetch technologies inventory", err);
      }
    };

    fetchTechnologiesInventory();
  }, []);

  const updateTechs = async () => {
    try {
      const res = await serverReq.put(`/techs`, {
        technologies: selectedTechnologies?.map((tech) => tech._id),
      });
      showToast("Settings Saved Successfully", "Save Success", "success");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Handle form submissions
  const onSave = () => {
    console.log({
      bio,
      relationshipStatus,
      selectedTechnologies,
    });
    updateTechs();
  };

  return (
    <Box className="flex flex-col p-4 bg-gray-50 rounded-md shadow-md">
      <Typography variant="h5" className="mb-6 text-primary">
        Edit Profile Settings
      </Typography>

      {/* Bio */}
      <TextField
        label="Bio"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="mb-6"
        placeholder="Tell us about yourself..."
      />

      {/* Relationship Status */}
      <FormControl fullWidth className="mb-6">
        <InputLabel>Relationship Status</InputLabel>
        <Select
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

      {/* Programming Languages */}
      <FormControl fullWidth className="mb-6">
        <div className="mb-2">
          <InputLabel>Programming Languages</InputLabel>
        </div>

        <ChipsSelector
          setSelectedChips={setSelectedTechnologies}
          selectedChips={selectedTechnologies}
          availableChips={availableTechnologies?? []}
        ></ChipsSelector>
      </FormControl>

      {/* Save Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={onSave}
        className="mt-2"
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default ProfileSettings;
