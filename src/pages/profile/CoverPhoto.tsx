import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ProfilePictureUploader from "../../components/sharedComponents/profilePicture/ProfilePictureUploader";
import { Paper } from "@mui/material";

interface CoverPhotoProps {
  userProfile?: boolean;
  coverPhoto?: string | null;
}

const CoverPhoto: React.FC<CoverPhotoProps> = ({
  userProfile = false,
  coverPhoto = null,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [uploaderOpen, setUploaderOpen] = useState(false);

  const onAddPictureClick = () => {
    setUploaderOpen(true);
  };

  const coverPhotoSrc = coverPhoto
  ? coverPhoto?.startsWith("data:image")
    ? coverPhoto // Already in data URI format
    : `data:image/jpeg;base64,${coverPhoto}` // Add data URI prefix if missing
  : "";


  return (
    <div>
      <ProfilePictureUploader
        setOpen={setUploaderOpen}
        open={uploaderOpen}
        purpose="cover"
      ></ProfilePictureUploader>
      {!coverPhoto ? (
        <Paper
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center justify-center bg-gray-100 w-full max-w-full max-h-[30rem] lg:h-[30rem] xs:h-52 z-10"
        >
          {userProfile && isHovered && (
            <AddIcon
              onClick={onAddPictureClick}
              className="w-40 h-40 lg:w-40 lg:h-40 xs:w-[6rem] xs:h-[6rem] bg-gray-300 fill-slate-50 hover:bg-gray-400 object-cover rounded-full"
            ></AddIcon>
          )}
        </Paper>
      ) : (
        <div
          onClick={() => userProfile && onAddPictureClick()}
          className="hover:brightness-90 w-full h-full bg-[50%_calc(50%-100px)] bg-no-repeat object-cover max-h-[30rem] lg:h-[30rem] xs:h-[20rem]"
          style={{
            backgroundImage: `url(${coverPhotoSrc})`,
            backgroundSize: "cover",
          }}
        ></div>
      )}
    </div>
  );
};

export default CoverPhoto;
