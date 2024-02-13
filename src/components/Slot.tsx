import React from "react";
import { Box, Typography } from "@mui/material";
import useResponsiveText from "../utils/useResponsiveText";
import PublicIcon from "@mui/icons-material/Public";
import Diversity3Icon from "@mui/icons-material/Diversity3";
interface Props {
  details: ProjectSlotDetails;
}

export const Slot: React.FC<Props> = ({ details }) => {

  const responsiveDesc = useResponsiveText(details.description, "md");
  return (
    <Box className="flex h-full w-full bg-primary hover:bg-primary-light">
      {<Box max-width="200px" className="py-5 px-2 flex flex-col">
        <Box className="mb-4">
          <Typography className="xs:text-xl sm:text-2xl md:text-.xl lg:text-4xl 2xl:text-5xl">
            {details.title}
          </Typography>
        </Box>
        <Box className="mb-4">
          <Typography className="xs:text-sm sm:text-sm md:text-md lg:text-lg 2xl:text-xl break-words"  style={{ wordWrap: "break-word" }}>
            {responsiveDesc}
          </Typography>
        </Box>
        <Box className="relative bottom-0">
          {details.isExposed ?<PublicIcon></PublicIcon> :<Diversity3Icon></Diversity3Icon>}
        </Box>
      </Box>}
    </Box>
  );
};
