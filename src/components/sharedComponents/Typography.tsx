import React from "react";
import { Typography as MuiTypography } from "@mui/material";
import { TypographyProps as MuiTypographyProps } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import clsx from "clsx";

interface TypographyProps extends MuiTypographyProps {
  className?: string; // For additional custom classes
}

const Typography: React.FC<TypographyProps> = ({ className, ...props }) => {
  return (
    <MuiTypography
      {...props}
      className={clsx("text-black dark:text-dark-text-light", className)} // Combine default and custom classes
    />
  );
};

export default Typography;
