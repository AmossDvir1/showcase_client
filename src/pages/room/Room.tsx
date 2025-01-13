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
  AvatarGroup,
  Skeleton,
} from "@mui/material";
import { Avatar as MuiAvatar } from "@mui/material";
import LinesSkeleton from "../../components/sharedComponents/LinesSkeleton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUserInfo } from "../../redux/slices/user";
import Avatar from "../../components/sharedComponents/Avatar";

const Room = () => {
  const isMobile = useMediaQuery(500);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [technology, setTechnology] = useState<Technology | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [friends, setFriends] = useState<UserDetails[]>([]);
  const userInfo = useAppSelector((state) => state.user.userInfo);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const response = await serverReq.get(`/rooms/${id}/users`);
        setFriends(response.data.users);

        const techResponse = await serverReq.get("/technologies/", {
          params: { id },
        });

        setTechnology(techResponse.data.tech);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching technology:", error);
        // Handle error, e.g., display an error message
      }
    };

    fetchRoomData();
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
          <MuiAvatar
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
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <div className="flex items-center gap-2">
              <AvatarGroup total={friends.length}>
                {friends.map((friend) => (
                  <Avatar
                    link={friend.urlMapping}
                    firstName={friend.firstName}
                    lastName={friend.lastName}
                    tooltip
                    key={friend?.id}
                    className="w-12 h-12 dark:bg-dark-paper bg-paper-dark text-primary dark:text-dark-text"
                    alt={friend?.username}
                    imageSrc={friend?.profilePicture?.imageStringBase64 || ""}
                  />
                ))}
              </AvatarGroup>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Room;
