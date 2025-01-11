import React from "react";
import { styled, SwipeableDrawer } from "@mui/material";
import { grey } from "@mui/material/colors";

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  ...theme.applyStyles("dark", {
    backgroundColor: grey[900],
  }),
}));

interface SwipeableMobileDrawerProps {
  open: boolean;
  toggleDrawer: () => void;
  buttons: React.ReactNode[];
}

const SwipeableMobileDrawer: React.FC<SwipeableMobileDrawerProps> = ({
  open,
  toggleDrawer,
  buttons,
}) => {
  const minDrawerHeight = 40 + 40 + 20 + 20 + 4 * buttons.length;

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer}
      onOpen={toggleDrawer}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        zIndex: 1500,
        "& .MuiPaper-root": {
           minHeight: `${minDrawerHeight}px`,
           maxHeight: '90vh',
          py: "40px",
          px: "40px",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
            overflow: 'auto',
        },
      }}
    >
      <Puller />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingRight: "4px",
          paddingLeft: "4px",
           height: "fit-content",
          borderRadius: "15px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        {buttons.map((button, index) => (
          <div
            key={index}
            style={{
              marginBottom: index === buttons.length - 1 ? "0px" : "20px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {button}
          </div>
        ))}
      </div>
    </SwipeableDrawer>
  );
};

export default SwipeableMobileDrawer;