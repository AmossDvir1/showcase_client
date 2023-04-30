import React from "react";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  onClick: () => void;
}

export const EmptySlot: React.FC<Props> = ({ onClick }) => {
  return (
    <Box
      className="items-center justify-center flex w-full bg-[rgb(255,255,255,0.07)] hover:bg-[rgb(117,115,197,0.22)] h-full cursor-pointer border border-dashed  border-gray-500"
      onClick={onClick}
    >
      <AddIcon className="text-primary text-5xl"></AddIcon>
    </Box>
  );
};
