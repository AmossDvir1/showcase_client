import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Slot } from "../components/Slot";
import { EmptySlot } from "../components/EmptySlot";
import { CreateProjectDialog } from "./createProject/CreateProjectDialog";
import { truncateText } from "../utils/utils";

interface Props {}

const VISIBLE_PROJECTS_NUM = 6;

export const UserProjectsDashboard: React.FC<Props> = () => {
  const [slots, setSlots] = useState<ProjectSlot[]>();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  useEffect(() => console.log(windowWidth), [windowWidth]);

  const onClose = (
    event: React.MouseEvent<HTMLButtonElement>,
    reason?: string
  ) => {
    if (reason && reason === "backdropClick") return;
    setCreateDialogOpen(false);
  };
  const onClickOpen = () => {
    setCreateDialogOpen(true);
  };

  const initializeSlots = () => {
    const slots = Array.from(Array(2)).map((_, index) => {
      return {
        projectName: index.toString(),
        projectDesc: `${index.toString()}:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Porttitor lacus luctus accumsan tortor posuere. Ridiculus mus mauris vitae ultricies. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est. Purus viverra accumsan in nisl nisi. Sagittis vitae et leo duis ut diam. Dictum sit amet justo donec enim diam vulputate. Feugiat in ante metus dictum at tempor. Ultrices in iaculis nunc sed augue. Varius sit amet mattis vulputate. A erat nam at lectus. Nisi est sit amet facilisis magna etiam tempor orci. Sapien eget mi proin sed libero. Facilisis mauris sit amet massa vitae tortor condimentum. Aliquam faucibus purus in massa tempor nec. Diam quis enim lobortis scelerisque fermentum dui faucibus in.`,
      };
    });
    setSlots(slots);
  };

  useEffect(() => initializeSlots(), []);

  return (
    <Box className="pt-5">
      <Typography className="xs:text-4xl md:text-5xl lg:text-8xl">Dashboard</Typography>
      <Box className="mt-12 flex sm:h-[30vh] xs:h-[20vh]">
        <Grid
          container
          spacing={{ xs: 4, md: 8 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(VISIBLE_PROJECTS_NUM)).map((_, index) => (
            <Grid item className="h-full flex" xs={2} sm={4} md={4} key={index}>
              {slots &&
                (index < slots.length ? (
                  <Slot>
                    <Box max-width="200px" className="py-5 px-2 ">
                      <Box className="mb-4">
                        <Typography className="xs:text-3xl sm:text-7xl">
                          {slots[index].projectName}
                        </Typography>
                      </Box>
                      <Box className="">
                        <Typography
                          sx={{}}
                          className="xs:text-lg md:text-xl lg:text-xl 2xl:text-2xl"
                        >
                          {slots[index].projectDesc.length > windowWidth / 15
                            ? truncateText(
                                slots[index].projectDesc,
                                windowWidth / 15
                              )
                            : slots[index].projectDesc}
                        </Typography>
                      </Box>
                    </Box>
                  </Slot>
                ) : (
                  <EmptySlot onClick={() => onClickOpen()}></EmptySlot>
                ))}
            </Grid>
          ))}
        </Grid>
        <CreateProjectDialog
          open={createDialogOpen}
          onClose={onClose}
        ></CreateProjectDialog>
      </Box>
    </Box>
  );
};
