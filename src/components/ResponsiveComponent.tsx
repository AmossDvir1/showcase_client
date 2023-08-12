import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Breakpoint } from "@mui/material";

interface Props {
  children?: React.ReactNode;
  breakpoint?: Breakpoint;
}

const ResponsiveComponent: React.FC<Props> = ({
  children,
  breakpoint = "lg",
}) => {
  const theme = useTheme();
  const isLargerScreen = useMediaQuery(theme.breakpoints.up(breakpoint));

  return (
    <>
      {/* Render the component if the screen is larger than the specified breakpoint */}
      {isLargerScreen && children}
    </>
  );
};

export default ResponsiveComponent;
