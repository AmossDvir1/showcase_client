import React, { useState } from "react";
import { FormControl, IconButton } from "@mui/material";
import Typography from "../../../components/sharedComponents/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GeoDialog from "./GeoDialog";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";

interface GeoSettingsProps {
  currentCity: { country: string; state: string; city: string };
  setCurrentCity: React.Dispatch<
    React.SetStateAction<{ country: string; state: string; city: string }>
  >;
}

const GeoSettings: React.FC<GeoSettingsProps> = ({
  currentCity,
  setCurrentCity,
}) => {
  const [isGeoDialogOpen, setIsGeoDialogOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const openGeoDialog = () => {
    setIsGeoDialogOpen(true);
  };

  const closeGeoDialog = () => {
    setIsGeoDialogOpen(false);
  };

  const editLocation = () => {
    setSelectedCountry(currentCity?.country);
    setSelectedState(currentCity?.state);
    setSelectedCity(currentCity?.city );
    setIsEditMode(true);
    setIsGeoDialogOpen(true);
  };

  const removeLocation = () => {
    setCurrentCity({ city: "", state: "", country: "" });
  };

  const onSaveLocation = () => {
    setCurrentCity({
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
    });
    closeGeoDialog();
    setIsEditMode(false);
  };

  return (
    <div>
      <FormControl fullWidth className="mb-6">
          <div className="flex flex-col">
            <div className="flex my-2 items-center justify-between hover:bg-gray-100 dark:hover:bg-dark-paper-light p-2 rounded transition duration-200">
              <div className="flex flex-col w-[70%]">
                <Typography className="text-black text-sm">{`${currentCity.city}, ${currentCity.state}, ${currentCity.country}`}</Typography>
              </div>
              <div className="flex items-center justify-end">
                {/* Edit icon */}
                <IconButton onClick={() => editLocation()}>
                  <EditIcon />
                </IconButton>

                {/* Remove icon */}
                <IconButton onClick={() => removeLocation()}>
                  <RemoveIcon />
                </IconButton>
              </div>
            </div>

            <div className="flex flex-row justify-center items-center">
              <div className="cursor-pointer" onClick={openGeoDialog}>
                <Typography className="text-black text-sm">
                  Add location
                </Typography>
              </div>
              <IconButton
                onClick={openGeoDialog}
                disableRipple
                disableTouchRipple
                disableFocusRipple
              >
                <AddCircleOutlineIcon />
              </IconButton>
          </div>
        </div>
      </FormControl>
      <GeoDialog
        isEditMode={isEditMode}
        isOpen={isGeoDialogOpen}
        closeDialog={closeGeoDialog}
        
      />
    </div>
  );
};

export default GeoSettings;
