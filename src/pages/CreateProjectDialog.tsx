import React, { SetStateAction, useState } from "react";
import { Button } from "../components/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { CreateProjectForm } from "./CreateProjectForm";
import { createProject } from "../controllers/createProjectController";

interface Props {}

export const CreateProjectDialog: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [projectName, setProjectName] = useState<string>("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onSubmit = async () => {
    setCreateLoading(true);
    const res = await createProject({ projectName });
    setCreateLoading(false);
  };

  const handleClose = (
    event: React.MouseEvent<HTMLButtonElement>,
    reason?: string
  ) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleClickOpen}>+ Create</Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        className=""
      >
        <DialogTitle id="responsive-dialog-title">
          {"Create New Project"}
        </DialogTitle>
        <Divider></Divider>
        <DialogContent>
          <CreateProjectForm
            onProjectNameChange={setProjectName}
          ></CreateProjectForm>
          {/* <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button
            className="ml-2"
            bgcolor="bg-[rgb(204,0,0)]"
            bgcolorhover="hover:bg-[rgb(230,0,0)]"
            round
            autoFocus
            btnsize="xs"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            className="mr-2"
            round
            btnsize="xs"
            onClick={onSubmit}
            loading={createLoading}
            loadingText="Creating"
            autoFocus
            disabled={!projectName}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
