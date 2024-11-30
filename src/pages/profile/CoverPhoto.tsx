import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ProfilePictureUploader from "../../components/sharedComponents/profilePicture/ProfilePictureUploader";
import { Button, Menu, MenuItem, Paper } from "@mui/material";
import SwipeableMobileDrawer from "../../components/sharedComponents/SwipeableMobileDrawer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PictureViewer from "./PictureViewer";
import useMediaQuery from "../../components/responsiveness/useMediaQuery";
import { convertPictureToURI } from "../../utils/utils";

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [menuPosition, setMenuPosition] = useState([0, 0]); // State to save the position where you clicked

  const isMobile = useMediaQuery(600);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const onAddPictureClick = () => {
    setUploaderOpen(true);
    setDrawerOpen(false);
    setMenuOpen(false);
  };

  const onViewPictureClick = () => {
    setViewerOpen(true);
    setDrawerOpen(false);
    setMenuOpen(false);
  };

  const onExistingPictureClick = (e: React.MouseEvent<HTMLElement>) => {
    if (userProfile) {
      if (isMobile) {
        toggleDrawer();
      } else {
        setMenuOpen(true);
        setMenuPosition([e.pageX, e.pageY]);
      }
    } else {
      setViewerOpen(true);
    }
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
      <PictureViewer
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        pictureSrc={convertPictureToURI(coverPhotoSrc)} // Pass picture source
      />
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
          onClick={onExistingPictureClick}
          className="hover:brightness-90 w-full h-full bg-[50%_calc(50%-100px)] bg-no-repeat object-cover max-h-[30rem] lg:h-[30rem] xs:h-[20rem]"
          style={{
            backgroundImage: `url(${coverPhotoSrc})`,
            backgroundSize: "cover",
          }}
        ></div>
      )}
      {userProfile && !isMobile && (
        <Menu
          anchorReference="anchorPosition"
          anchorPosition={{ top: menuPosition[1], left: menuPosition[0] }}
          disableScrollLock
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          sx={{
            zIndex: 1500,
          }}
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

export default CoverPhoto;
