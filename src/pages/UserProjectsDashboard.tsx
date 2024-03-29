import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Slot } from "../components/Slot";
import { EmptySlot } from "../components/EmptySlot";
import { CreateProjectDialog } from "./createProject/CreateProjectDialog";
import useFetchProjectSlots from "../API/useFetchProjectSlots";
import Loader from "../components/sharedComponents/Loader";

interface Props {}

const VISIBLE_PROJECTS_NUM = 6;

export const UserProjectsDashboard: React.FC<Props> = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { projectSlots, loading } = useFetchProjectSlots();

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

  return (
    <Box className="pt-5">
      <Typography className="xs:text-4xl md:text-5xl lg:text-8xl">
        Dashboard
      </Typography>
      <Box className="mt-12 flex sm:h-[30vh] xs:h-[20vh]">
        <Grid
          container
          spacing={{ xs: 4, md: 8 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(VISIBLE_PROJECTS_NUM)).map((_, index) => (
            <Grid item className="h-full flex" xs={2} sm={4} md={4} key={index}>
              {projectSlots &&
                (index < projectSlots?.length ? (
                  <Slot
                    details={{
                      title: projectSlots[index]?.title || "",
                      description: projectSlots[index]?.description || "",
                      isExposed: projectSlots[index]?.isExposed,
                    }}
                  ></Slot>
                ) : (
                  <EmptySlot loading={loading} onClick={() => onClickOpen()}></EmptySlot>
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
