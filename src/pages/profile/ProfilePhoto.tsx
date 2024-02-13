import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import ProfilePictureUploader from "../../components/sharedComponents/profilePicture/ProfilePictureUploader";

interface ProfilePhotoProps {
  userProfile?: boolean;
  profilePicture?: string | null;
}
const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  userProfile = false,
  profilePicture = null,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [uploaderOpen, setUploaderOpen] = useState(false);

  const onAddPictureClick = () => {
    setUploaderOpen(true);
  };

  return (
    <div className="rounded-full border-solid border-white border-4 z-20">
      <ProfilePictureUploader
        setOpen={setUploaderOpen}
        open={uploaderOpen}
        purpose="profile"
      ></ProfilePictureUploader>
      {isHovered && userProfile && !profilePicture ? (
        <AddIcon
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onAddPictureClick}
          className="w-40 h-40 lg:w-40 lg:h-40 xs:w-[6rem] xs:h-[6rem] bg-gray-300 fill-slate-50 hover:bg-gray-400 object-cover rounded-full relative"
        ></AddIcon>
      ) : !profilePicture ? (
        <PersonIcon
          className="w-40 h-40 lg:w-40 lg:h-40 xs:w-[6rem] xs:h-[6rem] bg-gray-300 fill-slate-50 hover:bg-gray-400 object-cover rounded-full relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        ></PersonIcon>
      ) : (
        <img
          onClick={() => userProfile && setUploaderOpen(true)}
          className="rounded-full w-40 h-40 lg:w-40 lg:h-40 xs:w-[6rem] xs:h-[6rem] hover:brightness-90"
          src={profilePicture}
          alt="profilePicture"
        ></img>
      )}
    </div>
  );
};

export default ProfilePhoto;
