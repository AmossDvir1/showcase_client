import React from "react";
import { Typography as MuiTypography } from "@mui/material";
import { TypographyProps as MuiTypographyProps } from "@mui/material";
import clsx from "clsx";

interface TypographyProps extends MuiTypographyProps {
  className?: string; // For additional custom classes
}

const Typography: React.FC<TypographyProps> = ({ className, ...props }) => {
  return (
    <MuiTypography
    className={clsx("text-black dark:text-dark-text cursor-default", className)} // Combine default and custom classes
      {...props}
    />
  );
};

export default Typography;
