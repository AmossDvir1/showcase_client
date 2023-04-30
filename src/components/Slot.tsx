import React from "react";
import { Box, Typography } from "@mui/material";
import useResponsiveText from "../utils/useResponsiveText";

interface Props {
  details: ProjectSlotDetails;
}

export const Slot: React.FC<Props> = ({ details }) => {

  const responsiveDesc = useResponsiveText(details.projectDesc, "md");
  return (
    <Box className="flex h-full w-full bg-primary hover:bg-primary-light">
      <Box max-width="200px" className="py-5 px-2 ">
        <Box className="mb-4">
          <Typography className="xs:text-3xl sm:text-7xl">
            {details.projectName}
          </Typography>
        </Box>
        <Box className="">
          <Typography className="xs:text-lg md:text-xl lg:text-xl 2xl:text-2xl break-words"  style={{ wordWrap: "break-word" }}>
            {responsiveDesc}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
