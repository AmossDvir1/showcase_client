import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Box,
  chakra,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import LinesSkeleton from "../LinesSkeleton";
import Typography from "../Typography";
import { Chip } from "./Chip";
import { Avatar, AvatarGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";
import useMediaQuery from "../../responsiveness/useMediaQuery";

type TechnologyChipProps = {
  id: string;
  label: string;
  icon?: string;
  color?: string;
};

const MotionBox = chakra(motion.div);

const TechnologyChip: React.FC<TechnologyChipProps> = ({
  id,
  label,
  icon,
  color,
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    friendsUsing: number;
    totalUsers: number;
  } | null>(null);

  const isMobile = useMediaQuery(500);

  const fetchTechnologyData = async () => {
    setLoading(true);
    try {
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              friendsUsing: Math.floor(Math.random() * 100),
              totalUsers: Math.floor(Math.random() * 10000),
            }),
          1000
        )
      );
      setData(response as { friendsUsing: number; totalUsers: number });
    } catch (error) {
      console.error("Failed to fetch technology data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    if (!data) {
      fetchTechnologyData();
    }
  };

  return (
    <Popover
      trigger={isMobile ? "click" : "hover"}
      placement="top"
      onOpen={handleOpen}
    >
      <PopoverTrigger>
        <Box>
          <Chip
            iconSrc={icon}
            id={id}
            outlineColor={color}
            label={label}
            variant="outlined"
            color="primary"
          />
        </Box>
      </PopoverTrigger>
      <PopoverContent
        boxShadow="2xl"
        borderColor={color || "black"}
        overflow="hidden"
      >
        <PopoverArrow />
        <MotionBox
          initial={{ height: "65px" }} // Initial height for the skeleton
          animate={{ height: loading ? "65px" : "auto" }} // Animate height transition
          transition={{ duration: "0.3" }} // Animation duration
          className="bg-paper dark:bg-dark-paper-light rounded-lg p-4 min-h-[65px] h-fit min-w-48 w-fit max-w-56"
        >
          {loading ? (
            <LinesSkeleton numOfLines={3} />
          ) : data ? (
            <>
              <Box className="flex gap-3 items-center mb-3">
                <Avatar
                  sx={{
                    borderWidth: "1px",
                    borderColor: color,
                    borderStyle: "solid",
                  }}
                  className={`bg-transparent ${
                    isMobile ? "w-5 h-5" : "w-7 h-7"
                  }`}
                  src={icon}
                />
                <Typography>{label}</Typography>
              </Box>
              <div className="flex">
                <AvatarGroup total={data.friendsUsing}>
                  <Avatar
                    className="w-9 h-9 dark:bg-dark-paper bg-paper-dark text-primary dark:text-dark-text"
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                  />
                  <Avatar
                    className="w-9 h-9 dark:bg-dark-paper bg-paper-dark text-primary dark:text-dark-text"
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                  <Avatar
                    className="w-9 h-9 dark:bg-dark-paper bg-paper-dark text-primary dark:text-dark-text"
                    alt="Cindy Baker"
                    src="/static/images/avatar/3.jpg"
                  />
                  <Avatar
                    className="w-9 h-9 dark:bg-dark-paper bg-paper-dark text-primary dark:text-dark-text"
                    alt="Agnes Walker"
                    src="/static/images/avatar/4.jpg"
                  />
                  <Avatar
                    alt="Trevor Henderson"
                    src="/static/images/avatar/5.jpg"
                  />
                </AvatarGroup>
              </div>
              <Typography className="text-sm text-gray-500">
                Total users: {data.totalUsers}
              </Typography>
              <Box className="mt-3">
                <CustomButton
                  fullWidth
                  size="small"
                  className={
                    isMobile
                      ? "px-4 py-1 text-xs font-light"
                      : "px-5 py-2 text-sm"
                  }
                  onClick={() => navigate(`/room/${id}`)}
                >
                  Visit {label} room
                </CustomButton>
              </Box>
            </>
          ) : (
            <Typography className="text-sm text-gray-500">
              No data available
            </Typography>
          )}
        </MotionBox>
      </PopoverContent>
    </Popover>
  );
};

export default TechnologyChip;
