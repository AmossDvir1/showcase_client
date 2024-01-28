import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface ProfileMenuProps {
  userProfile?: boolean;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ userProfile = false }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
      <Tab
        sx={{ textTransform: "none", fontSize: "17px" }}
        label="Posts"
        {...a11yProps(0)}
      />
      <Tab
        sx={{ textTransform: "none", fontSize: "17px" }}
        label="Friends"
        {...a11yProps(1)}
      />
      <Tab
        sx={{ textTransform: "none", fontSize: "17px" }}
        label="About"
        {...a11yProps(2)}
      />
    </Tabs>
  );
};

export default ProfileMenu;
