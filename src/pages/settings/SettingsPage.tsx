import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close"; // Import Close Icon
import Typography from "../../components/sharedComponents/Typography";
import GeneralSettings from "./general/GeneralSettings";
import ProfileSettings from "./profile/ProfileSettings";
import DeviceManagement from "./security/DeviceManagement";
import { Dialog, ListItemButton } from "@mui/material";
import useMediaQuery from "../../components/responsiveness/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { getUserSettings } from "../../controllers/userSettingsController/profileSettings/getUserSettings";
import { fetchTechnologiesInventory } from "../../controllers/technologiesController/fetchTechnologiesInventory";
import { updateUserProfileSettings } from "../../controllers/userSettingsController/profileSettings/updateUserProfileSettings";
import { showToast } from "../../utils/toast";

const defaultSettings = {
  bio: "",
  relationshipStatus: "",
  technologies: [],
  work: [],
  currentCity: { country: "", state: "", city: "" },
};

const SettingsPage: React.FC = () => {
  const isMobile = useMediaQuery(500);
  const navigate = useNavigate();
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>(
    isMobile ? "menu" : "general"
  );
  const [profileSettings, setProfileSettings] =
    useState<IProfileSettings>(defaultSettings);
  const [loadingProfileSettings, setLoadingProfileSettings] =
    useState<boolean>(false);
  useEffect(() => {
    !isMobile && activePage === "menu" && setActivePage("general");
  }, [isMobile]);

  const [availableChips, setAvailableChips] = useState<
    ChipItem[]
  >([]);
  const [availableTechnologies, setAvailableTechnologies] = useState<
    Technology[]
  >([]);

  // data fetching:
  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        setLoadingProfileSettings(true);
        const res = await getUserSettings();
        if (res?.profile) {
          setProfileSettings(res.profile);
        }
      } catch (err) {
        console.error("Failed to fetch user settings", err);
      }
      setLoadingProfileSettings(false);
    };

    const fetchAvailableTechnologies = async () => {
      try {
        setLoadingProfileSettings(true);
        const techs = await fetchTechnologiesInventory();
        if (techs) {
          setAvailableTechnologies(techs)
          setAvailableChips(techs);
        }
      } catch (err) {
        console.error("Failed to fetch technologies inventory", err);
      }
      setLoadingProfileSettings(false);
    };
    fetchAvailableTechnologies();
    fetchUserSettings();
  }, []);

  const menuItems = [
    { label: "General Settings", page: "general" },
    { label: "Profile Settings", page: "profile" },
    { label: "Device Management", page: "devices" },
  ];

  const updateProfileSettings = async (isAutoSave=false) => {
    try {
      setIsSaveLoading(true);
      const res = await updateUserProfileSettings({
        technologies: profileSettings.technologies,
        bio: profileSettings.bio,
        work: profileSettings.work,
        relationshipStatus: profileSettings.relationshipStatus,
        // currentCity: {
        //   city: profileSettings.currentCity.city.toString(),
        //   state: currentCity.state.toString(),
        //   country: currentCity.country.toString(),
        // },
      });
      !isAutoSave && showToast("Settings Saved Successfully", "Save Success", "success");
      return res.data;
    } catch (err) {
      console.log(err);
    } finally {
      setIsSaveLoading(false);
    }
  };

  const closeSettings = () => navigate(-1);

  const renderContent = () => {
    switch (activePage) {
      case "general":
        return <GeneralSettings />;
      case "profile":
        return (
          <ProfileSettings
            setSettings={setProfileSettings}
            loading={loadingProfileSettings}
            onSave={updateProfileSettings}
            loadingSave={isSaveLoading}
            settings={profileSettings}
            availableTechnologies={availableTechnologies}
          />
        );
      case "devices":
        return <DeviceManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 dark:bg-dark-paper  mt-24">
      {/* Drawer for Navigation Menu */}
      <Drawer
        variant="persistent"
        open={isMobile ? activePage === "menu" : true}
        className="md:w-60 w-full"
        classes={{
          paper: "bg-gray-50 dark:bg-dark-paper md:static w-full md:w-60",
        }}
      >
        <div className="p-4 flex justify-between items-center">
          <Typography variant="h5" className="text-gray-800 dark:text-gray-300">
            Settings
          </Typography>
          {/* "X" Icon for Mobile */}
          {isMobile && (
            <IconButton
              onClick={closeSettings}
              className="text-gray-800 dark:text-gray-300"
            >
              <CloseIcon />
            </IconButton>
          )}
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.page}
              onClick={() => setActivePage(item.page)}
              className={`${
                activePage === item.page && !isMobile
                  ? "bg-primary"
                  : "hover:bg-gray-100 dark:hover:bg-dark-paper-light"
              }`}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  className: `text-gray-800 dark:text-dark-text-light ${
                    activePage === item.page ? "text-paper" : ""
                  }`,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        {activePage === "menu" ? (
          <Typography variant="h6" className="text-gray-800 dark:text-gray-300">
            Select a setting from the menu.
          </Typography>
        ) : isMobile ? (
          <Dialog fullScreen className="h-[100svh]" open={true}>
            {/* Back Button */}
            {activePage !== "menu" && (
              <div className="p-4 flex justify-start items-center">
                <IconButton
                  onClick={() => setActivePage("menu")}
                  className="text-gray-800 dark:text-gray-300"
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography className="ml-2 text-gray-800 dark:text-gray-300">
                  Back to Menu
                </Typography>
              </div>
            )}
            <div className="flex flex-col p-4 bg-gray-50 dark:bg-dark-paper rounded-md">
              {renderContent()}
            </div>
          </Dialog>
        ) : (
          <div className="flex flex-col p-4 bg-gray-50 dark:bg-dark-paper rounded-md">
            {renderContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
