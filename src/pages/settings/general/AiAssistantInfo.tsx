import React, { useState } from "react";
import {
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "../../../components/sharedComponents/Typography";
import useMediaQuery from "../../../components/responsiveness/useMediaQuery";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

const AiAssistantInfo: React.FC = () => {
  const isMobile = useMediaQuery(500); // Determine if the screen is mobile
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    if (isMobile) {
      setOpenModal(true);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Tooltip
        title={
          <div>
            <div className="flex items-center justify-start pb-2">
              <AutoAwesomeOutlinedIcon />
              <span
                className="px-2"
                role="img"
                aria-label="robot"
                style={{ fontSize: "1.25rem" }}
              >
                🤖
              </span>
              <Typography>AI Assistant:</Typography>
            </div>
            <Typography className="font-normal text-sm">
              Elevate your experience with smart suggestions and tools designed
              just for developers.
            </Typography>
          </div>
        }
        arrow
        placement="bottom"
        componentsProps={{
          tooltip: {
            sx: {
              background: "linear-gradient(135deg, #3A3F47, #4C566A)", // Gradient background
              color: "#FFFFFF",
              fontSize: "0.875rem",
              fontWeight: "400",
              borderRadius: "10px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)", // Subtle shadow
              padding: "10px 15px",
              maxWidth: "220px",
              textAlign: "center",
              "& .MuiTooltip-arrow": {
                color: "#3A3F47", // Match the gradient start color
              },
            },
          },
        }}
      >
        <span
          onClick={handleClick}
          className={`ml-2 text-[#898d96] cursor-pointer hover:opacity-80 transition-opacity duration-300`}
        >
          <InfoOutlinedIcon fontSize="small" />
        </span>
      </Tooltip>

      {/* Modal for Mobile */}
      {isMobile && (
        <Dialog open={openModal} onClose={handleClose} fullWidth>
          <DialogTitle className="flex justify-between items-center bg-gradient-to-r from-paper-light via-paper to-paper-dark dark:from-gray-700  dark:via-gray-800 dark:to-gray-900 dark:text-white">
            <div className="flex items-center">
              <AutoAwesomeOutlinedIcon />
              <span role="img" aria-label="robot" style={{ fontSize: "2rem" }}>
                🤖
              </span>
              <Typography variant="h5" className="pl-2">
                AI Assistant
              </Typography>
            </div>
            <IconButton onClick={handleClose} className="">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className="  text-center">
            <div className="flex items-center justify-center pb-4"></div>
            <Typography className="font-normal text-base">
              Elevate your experience with smart suggestions and tools designed
              just for developers.
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AiAssistantInfo;
