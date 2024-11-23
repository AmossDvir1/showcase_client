import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import ProfileSettings from './ProfileSettings';
import { getUserSettings } from '../../controllers/userSettingsController/profileSettings/getUserSettings';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [initialProfileSettings, setInitialProfileSettings] = useState<IProfileSettings>();

useEffect(() => {
    const fetchUserSettings = async () => {
        try {
          const res = await getUserSettings();
          if (res?.profile) {
            setInitialProfileSettings(res.profile);
          }
        } catch (err) {
          console.error("Failed to fetch user settings", err);
        }
      };
      fetchUserSettings();
}, []);

  // Handles tab changes
  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Content for each tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <ProfileSettings initialSettings={initialProfileSettings}/>;
      case 1:
        return <SecuritySettings />;
      case 2:
        return <NotificationSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-32 flex flex-col items-center p-6 bg-gray-100 h-screen">
      <Typography variant="h4" className="mb-4">
        Settings
      </Typography>
      <Box className="w-full max-w-[600px]" >
        {/* Tabs for Navigation */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Profile Settings" />
          <Tab label="Security Settings" />
          <Tab label="Notification Settings" />
        </Tabs>

        {/* Tab Content */}
        <Box className="mt-6 p-4 bg-white rounded shadow-md">
          {renderTabContent()}
        </Box>
      </Box>
    </div>
  );
};



const SecuritySettings: React.FC = () => (
  <div>
    <Typography variant="h6">Security Settings</Typography>
    <p>Update your password and manage account security.</p>
  </div>
);

const NotificationSettings: React.FC = () => (
  <div>
    <Typography variant="h6">Notification Settings</Typography>
    <p>Customize your notification preferences.</p>
  </div>
);

export default SettingsPage;
