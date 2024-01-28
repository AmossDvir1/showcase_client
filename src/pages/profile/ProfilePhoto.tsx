import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";

interface ProfilePhotoProps {
  userProfile?: boolean;
}
const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ userProfile = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="rounded-full border-solid border-white border-4">
      {isHovered && userProfile ? (
        <AddIcon
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-40 h-40 bg-gray-300 fill-slate-50 hover:bg-gray-400 object-cover rounded-full relative z-20"
        ></AddIcon>
      ) : (
        <PersonIcon
          className="w-40 h-40 bg-gray-300 fill-slate-50 hover:bg-gray-400 object-cover rounded-full relative z-20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        ></PersonIcon>
      )}
    </div>
  );
};

export default ProfilePhoto;
