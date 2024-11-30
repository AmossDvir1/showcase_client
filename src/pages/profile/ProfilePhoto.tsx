import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import ProfilePictureUploader from "../../components/sharedComponents/profilePicture/ProfilePictureUploader";
import { convertPictureToURI } from "../../utils/utils";
import { Button, Menu, MenuItem } from "@mui/material";
import useMediaQuery from "../../components/responsiveness/useMediaQuery";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PictureViewer from "./PictureViewer";
import SwipeableMobileDrawer from "../../components/sharedComponents/SwipeableMobileDrawer";

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
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);


  const isMobile = useMediaQuery(600);

  const onMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const onMenuClose = () => {
    setMenuAnchor(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const onAddPictureClick = () => {
    setUploaderOpen(true);
    setDrawerOpen(false);
    onMenuClose();
  };

  const onViewPictureClick = () => {
    setViewerOpen(true);

    // Logic to view current profile picture (e.g., open a modal)
    onMenuClose();
    setDrawerOpen(false);
  };

  return (
    <div className="rounded-full border-solid border-white border-4 z-20">
      <ProfilePictureUploader
        setOpen={setUploaderOpen}
        open={uploaderOpen}
        purpose="profile"
      ></ProfilePictureUploader>
      {profilePicture && (
        <PictureViewer
          open={viewerOpen}
          onClose={() => setViewerOpen(false)}
          pictureSrc={convertPictureToURI(profilePicture)} // Pass picture source
        />
      )}
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
          onClick={(e: React.MouseEvent<HTMLElement>) =>
            userProfile
              ? isMobile
                ? toggleDrawer()
                : onMenuOpen(e)
              : setViewerOpen(true)
          }
          className="rounded-full w-40 h-40 lg:w-40 lg:h-40 xs:w-[6rem] xs:h-[6rem] hover:brightness-90 object-cover"
          src={convertPictureToURI(profilePicture)}
          alt="profilePicture"
        ></img>
      )}
      {userProfile && !isMobile && (
        <Menu
          anchorEl={menuAnchor}
          disableScrollLock
          open={Boolean(menuAnchor)}
          onClose={onMenuClose}
          sx={{ zIndex: 1500 }}
        >
          <MenuItem onClick={onViewPictureClick}>View Picture</MenuItem>
          <MenuItem onClick={onAddPictureClick}>Upload a New Picture</MenuItem>
        </Menu>
      )}

      {userProfile && isMobile && (
        <SwipeableMobileDrawer
          open={drawerOpen}
          toggleDrawer={toggleDrawer}
          buttons={[
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={onViewPictureClick}
              sx={{
                width: "80%",
                height: "3.5rem",
                fontSize: "1rem",
              }}
            >
              View Picture
            </Button>,
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={onAddPictureClick}
              sx={{ width: "80%", height: "3.5rem", fontSize: "1rem" }}
              startIcon={<AddCircleIcon></AddCircleIcon>}
            >
              Upload a New Picture
            </Button>,
          ]}
        ></SwipeableMobileDrawer>
      )}
    </div>
  );
};

export default ProfilePhoto;
