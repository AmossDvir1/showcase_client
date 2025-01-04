import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import ProfilePictureUploader from "../../components/sharedComponents/profilePicture/ProfilePictureUploader";
import { convertPictureToURI } from "../../utils/utils";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import useMediaQuery from "../../components/responsiveness/useMediaQuery";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PictureViewer from "./PictureViewer";
import SwipeableMobileDrawer from "../../components/sharedComponents/SwipeableMobileDrawer";
import { colors } from "../../utils/theme";
import { useAppSelector } from "../../redux/hooks";

interface ProfilePhotoProps {
  userProfile?: boolean;
  profilePicture?: PictureData;
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

  const isDarkMode = useAppSelector((state) => state.theme.mode) === "dark";
  const isMobile = useMediaQuery(600);

  useEffect(() => {
    if (drawerOpen || uploaderOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px"; // Prevent layout shift
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [drawerOpen, uploaderOpen]);

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
    <div className="rounded-full border-solid dark:border-dark-paper-light border-white border-4 z-20 xl:h-52 xl:lg:w-52 w-32 h-32">
      <ProfilePictureUploader
        setOpen={setUploaderOpen}
        open={uploaderOpen}
        purpose="profile"
      ></ProfilePictureUploader>
      {profilePicture && (
        <PictureViewer
          open={viewerOpen}
          onClose={() => setViewerOpen(false)}
          pictureSrc={convertPictureToURI(profilePicture.imageStringBase64)} // Pass picture source
        />
      )}
      {isHovered && userProfile && !profilePicture ? (
        <AddIcon
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onAddPictureClick}
          className="w-[inherit] h-[inherit] dark:fill-dark-paper fill-slate-50 hover:bg-slate-400 bg-slate-400 rounded-full"
        ></AddIcon>
      ) : !profilePicture ? (
        <Avatar
          className=" w-[inherit] h-[inherit] bg-slate-50 dark:bg-dark-paper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          src={`${process.env.PUBLIC_URL}/images/icons/profile_pic.png`}
        />
      ) : (
        <img
          onClick={(e: React.MouseEvent<HTMLElement>) =>
            userProfile
              ? isMobile
                ? toggleDrawer()
                : onMenuOpen(e)
              : setViewerOpen(true)
          }
          className="rounded-full w-[inherit] h-[inherit] hover:brightness-90 object-cover"
          style={
            {
              // objectPosition: `${profilePicture.imageOffset?.x}px ${profilePicture.imageOffset?.y}px`, // Apply offset
            }
          }
          src={convertPictureToURI(profilePicture.imageStringBase64)}
          alt="profilePicture"
        />
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
                color: isDarkMode ? colors.darkText : colors.primary,
              }}
            >
              View Picture
            </Button>,
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={onAddPictureClick}
              sx={{
                width: "80%",
                height: "3.5rem",
                fontSize: "1rem",
                color: isDarkMode ? colors.darkText : colors.primary,
              }}
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
