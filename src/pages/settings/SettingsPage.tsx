import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Divider } from '@mui/material';
import Typography from '../../components/sharedComponents/Typography';
import ProfileSettings from './profile/ProfileSettings';
import { getUserSettings } from '../../controllers/userSettingsController/profileSettings/getUserSettings';
import DeviceManagement from './security/DeviceManagement';
import GeneralSettings from './general/GeneralSettings';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [loadingProfileSettings, setLoadingProfileSettings] = useState<boolean>(false);
  const [initialProfileSettings, setInitialProfileSettings] = useState<IProfileSettings>();

useEffect(() => {
    const fetchUserSettings = async () => {
        try {
          setLoadingProfileSettings(true);
          const res = await getUserSettings();
          if (res?.profile) {
            setInitialProfileSettings(res.profile);
          }
        } catch (err) {
          console.error("Failed to fetch user settings", err);
        }
        setLoadingProfileSettings(false);
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
        return <GeneralSettings />;
      case 1:
        return <ProfileSettings loading={loadingProfileSettings} initialSettings={initialProfileSettings}/>;
      case 2:
        return <SecuritySettings />;
      case 3:
        return <NotificationSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-8 md:mt-32 flex flex-col items-center p-6 h-screen">
      <Typography variant="h4" className="mb-4">
        Settings
      </Typography>
      <Box className="w-screen md:w-[600px] rounded-xl bg-gray-50 dark:bg-dark-paper-dark" >
        <Tabs
        className="p-0 m-0"
          value={activeTab}
          onChange={handleTabChange}
          // indicatorColor="secondary"
          // textColor="secondary"
          centered
        >
          <Tab className="px-16 md:px-8 xs:max-md:m-0 xs:max-md:w-[10%]" label="General" />
          <Tab className="px-16 md:px-8 xs:max-md:m-0 xs:max-md:w-[10%]" label="Profile" />
          <Tab className="px-16 md:px-8 xs:max-md:w-[10%]" label="Security" />
          <Tab className="px-16 md:px-8 xs:max-md:w-[10%]" label="Notifications" />
        </Tabs>
          <Divider className="w-full flex"></Divider>

        {/* Tab Content */}
        <Box className="mt-6 p-4 bg-gray-50 dark:bg-dark-paper rounded-xl shadow-md">
          {renderTabContent()}
        </Box>
      </Box>
    </div>
  );
};



const SecuritySettings: React.FC = () => (
  <div>
    <DeviceManagement></DeviceManagement>
  </div>
);

const NotificationSettings: React.FC = () => (
  <div>
    <Typography variant="h6">Notification Settings</Typography>
    <p>Customize your notification preferences.</p>
  </div>
);

export default SettingsPage;
