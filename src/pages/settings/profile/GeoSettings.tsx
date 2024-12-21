import React, { useState } from "react";
import { FormControl, IconButton } from "@mui/material";
import Typography from "../../../components/sharedComponents/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Chip } from "../../../components/sharedComponents/Chip";
import GeoDialog from "./GeoDialog";
import { Country, State, City } from "react-country-state-city/dist/esm/types";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";

interface GeoSettingsProps {
  currentCity: { country: Country | string; state: State | string; city: City | string };
  setCurrentCity: React.Dispatch<
    React.SetStateAction<{ country: Country | string; state: State | string; city: City | string }>
  >;
}

const GeoSettings: React.FC<GeoSettingsProps> = ({
  currentCity,
  setCurrentCity,
}) => {
  const [isGeoDialogOpen, setIsGeoDialogOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const openGeoDialog = () => {
    setIsGeoDialogOpen(true);
  };

  const closeGeoDialog = () => {
    setIsGeoDialogOpen(false);
  };

  const editLocation = () => {
    setSelectedCountry(currentCity.country as Country);
    setSelectedState(currentCity.state as State);
    setSelectedCity(currentCity.city as City);
    setIsEditMode(true);
    setIsGeoDialogOpen(true);
  };

  const removeLocation = () => {
    setCurrentCity({ city: "", state: "", country: "" });
  };

  const onSaveLocation = () => {
    setCurrentCity({
      country: selectedCountry!,
      state: selectedState!,
      city: selectedCity!,
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

      {/* GeoDialog to add/edit location */}
      <GeoDialog
        isEditMode={isEditMode}
        isOpen={isGeoDialogOpen}
        closeDialog={closeGeoDialog}
        selectedCountry={selectedCountry}
        selectedState={selectedState}
        selectedCity={selectedCity}
        setSelectedCountry={setSelectedCountry}
        setSelectedState={setSelectedState}
        setSelectedCity={setSelectedCity}
      />
    </div>
  );
};

export default GeoSettings;
