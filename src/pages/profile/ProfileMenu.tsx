import React, { useState } from "react";
import { Tabs } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabPanel from "../../components/sharedComponents/tabs/TabPanel";
import FriendsList from "./FriendsList";
import ProfilePosts from "./ProfilePosts";

interface ProfileMenuProps {
  userData: UserProfile;
  userProfile?: boolean;
  setUserData: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ userData, setUserData }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="flex flex-col items-center xs:mx-4 lg:mx-12 mb-2">
        <Tabs value={value} onChange={handleChange}>
          <Tab
            className="lg:text-base xs:text-sm min-w-0"
            sx={{
              marginInline: { xs: "0rem", lg: 6 },
              paddingInline: { xs: "0.7rem", lg: 4 },
              textTransform: "none",
            }}
            label="Posts"
          />
          <Tab
            className="lg:text-base xs:text-sm min-w-0"
            sx={{
              marginInline: { xs: "0rem", lg: 6 },
              paddingInline: { xs: "0.7rem", lg: 4 },
              textTransform: "none",
            }}
            label="Friends"
          />
          <Tab
            className="lg:text-base xs:text-sm min-w-0"
            sx={{
              marginInline: { xs: "0rem", lg: 6 },
              paddingInline: { xs: "0.7rem", lg: 4 },
              textTransform: "none",
            }}
            label="About"
          />
        </Tabs>
        <div className="mt-4 xs:mx-0 w-full lg:px-10 flex flex-col rounded-lg bg-white">
          <TabPanel
            value={value}
            elements={[
              <ProfilePosts userData={userData}></ProfilePosts>,
              <FriendsList
                userData={userData}
                setUserData={setUserData}
              ></FriendsList>,
            ]}
          ></TabPanel>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
