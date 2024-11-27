import React from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
interface PictureViewerProps {
  open: boolean;
  onClose: () => void;
  pictureSrc: string | null;
}

const PictureViewer: React.FC<PictureViewerProps> = ({
  open,
  onClose,
  pictureSrc,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="picture-viewer-modal"
      aria-describedby="view-profile-picture"
    >
      <Box
        // className="flex justify-center items-center h-screen w-screen fixed top-11"
        // sx={{top: '11rem', position:'fixed'}}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Black background with slight transparency
          zIndex: 2000,
          outline: "none",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            color: "white",
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        {pictureSrc ? (
          <img
            src={pictureSrc}
            alt="Profile"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <div className="text-white text-xl">No picture available</div>
        )}
      </Box>
    </Modal>
  );
};

export default PictureViewer;
