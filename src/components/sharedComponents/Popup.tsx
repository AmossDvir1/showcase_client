import React from "react";
import { Button } from "./Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  label: string;
}
export const Popup: React.FC<Props> = ({ label }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className="ml-2"
        bgcolor="bg-[rgb(204,0,0)]"
        bgcolorhover="hover:bg-[rgb(230,0,0)]"
        round
        autoFocus
        btnsize="sm"
        onClick={handleClickOpen}
      >
        {label}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Discard New Project?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to discard the new project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} btnsize="xs">
            Discard
          </Button>
          <Button onClick={handleClose} btnsize="xs" autoFocus>
            Keep Editing
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
