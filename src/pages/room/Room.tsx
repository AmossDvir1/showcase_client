import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "../../components/sharedComponents/Typography";
import { serverReq } from "../../API/utils/axiosConfig";
import useMediaQuery from "../../components/responsiveness/useMediaQuery";

import {
  Box,
  Stack,
  Divider,
  Grid,
  Avatar,
  AvatarGroup,
  Skeleton,
} from "@mui/material";
import LinesSkeleton from "../../components/sharedComponents/LinesSkeleton";
// import Avatar from "../../components/sharedComponents/Avatar";

const Room = () => {
  const isMobile = useMediaQuery(500);

  const { id } = useParams();
  const [technology, setTechnology] = useState<Technology | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTechnology = async () => {
      try {
        setLoading(true);
        const response = await serverReq.get("/technologies/", {
          params: { id },
        }); // Replace with your actual API endpoint
        setTechnology(response.data.tech);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching technology:", error);
        // Handle error, e.g., display an error message
      }
    };

    fetchTechnology();
  }, [id]);

  return (
    <div className="xs:py-8 lg:py-20 xs:px-0">
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        {loading ? (
          <Skeleton
            className={isMobile ? "w-32 h-32" : "w-56 h-56"}
            variant="circular"
            animation="wave"
          ></Skeleton>
        ) : technology ? (
          <Avatar
            className={isMobile ? "w-32 h-32" : "w-56 h-56"}
            src={technology.icon}
          />
        ) : (
          <div></div>
        )}
        <Box className="w-1/2">
          {loading ? (
            <div className="max-w-48">
              <LinesSkeleton numOfLines={2}></LinesSkeleton>
            </div>
          ) : technology ? (
            <div>
              <Typography
                className={`${isMobile ? "text-3xl mb-0" : "text-6xl mb-2"} `}
              >
                {technology.label}
              </Typography>
              <Typography className="text-lg">{technology.category}</Typography>
            </div>
          ) : (
            <div></div>
          )}
        </Box>
      </Stack>
      <Divider />
      <Grid className="mt-2 flex" container spacing={2}>
        <Grid item xs={12} md={6}>
          {loading ? (
            <LinesSkeleton numOfLines={3}></LinesSkeleton>
          ) : technology ? (
            <Typography variant="body1">{technology.description}</Typography>
          ) : (
            <div></div>
          )}
          {/*  */}
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="flex items-center gap-2">
            <AvatarGroup total={56}>
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
            </AvatarGroup>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Room;
