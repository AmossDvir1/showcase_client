import React, { ReactNode, useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { toTitleCase } from "../utils/utils";
import { Button } from "../components/sharedComponents/Button";
import { useNavigate } from "react-router-dom";
import ProtectedComponent from "../components/sharedComponents/ProtectedComponent";
import { WritePost } from "../components/sharedComponents/posts/WritePost";
import { useAuth } from "../controllers/auth/useAuth";
import { getMyPosts } from "../controllers/postsController/getMyPostsController";
import Posts from "../components/sharedComponents/posts/Posts";
import useMediaQuery from "../components/responsiveness/useMediaQuery";

const GridItem: React.FC<{
  children?: ReactNode;
  className?: string;
  xs?: Number;
  sm?: Number;
  md?: Number;
  lg?: Number;
}> = ({ children, className }) => {
  return (
    // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
    // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
    // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
    <Grid className={className ?? ""} item xs={12} sm={6} md={3}>
      {children}
    </Grid>
  );
};

interface Props {}

export const HomePage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const isMobile = useMediaQuery(500);

  return (
    <Grid container className="xs:py-0 lg:py-10">
      <Grid item xs={12} sm={4} md={4}>
        <Grid container direction="column">
          <GridItem>
            <Box className="pb-6">
              <Typography className="cursor-default whitespace-pre-line text-start sm:text-2xl md:text-3xl lg:text-4xl">
                {toTitleCase(
                  "the Platform to\nshowcase, connect,\nand collaborate"
                )}
              </Typography>
            </Box>
          </GridItem>
          <GridItem>
            <Box>
              <Typography className="cursor-default whitespace-pre-line text-start sm:text-lg md:text-xl lg:text-2xl">
                {toTitleCase(
                  " get inspired by others,\nand connect with fellow developers\nfrom all around the world."
                )}
              </Typography>
            </Box>
          </GridItem>
          <GridItem className="xs:mt-4 lg:mt-7">
            <ProtectedComponent
              fallback={
                <Button round btnsize={isMobile ? "sm": "lg"} onClick={() => navigate("/sign_up")}>
                  get started
                </Button>
              }
            >
              <Button round btnsize={isMobile ? "sm": "lg"} onClick={() => navigate("/explore")}>
                explore
              </Button>
            </ProtectedComponent>
          </GridItem>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <Grid container direction="column">
          <GridItem className="mt-7">
            <ProtectedComponent>
              <WritePost></WritePost>
              <Posts></Posts>
            </ProtectedComponent>
          </GridItem>
        </Grid>
      </Grid>

      {auth?.checkFinished && !auth.isActivated && (
        <Grid item xs={12} sm={4} md={4} lg={4} className="self-center">
          <GridItem>
            <Box
              draggable={false}
              className="w-48 md:w-64 lg:w-[30rem]"
              component="img"
              src={require("../assets/homepage-img.png")}
              alt="homepage-img"
            ></Box>
          </GridItem>
        </Grid>
      )}
    </Grid>
  );
};
