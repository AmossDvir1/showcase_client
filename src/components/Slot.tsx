import React from "react";
import { Box } from "@mui/material";

interface Props {
  value?: string;
  empty?: boolean;
  children?: React.ReactNode;
}

export const Slot: React.FC<Props> = ({ value, children }) => {
  return (
    <Box className="flex h-full w-full bg-primary hover:bg-primary-light">
      {children}
    </Box>
  );
};
