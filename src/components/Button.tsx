import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
  text: string;
}

export const Button: React.FC<Props> = ({ text }) => {
  return (
    <Box className="bg-primary hover:bg-primary-light py-3.5 px-10 rounded-full w-fit cursor-default">
      <Typography className="font-medium text-white text-center text-xl">
      {text.toUpperCase()}
      </Typography>
    </Box>
  );
};
