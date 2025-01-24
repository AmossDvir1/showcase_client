import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import GeoSelect from "../../../components/sharedComponents/GeoSelect";

interface GeoDialogProps {
  isOpen: boolean;
  isEditMode: boolean;
  closeDialog: () => void;

}

const GeoDialog: React.FC<GeoDialogProps> = ({
  isOpen,
  isEditMode,
  closeDialog,

}) => {
  return (
    <Dialog open={isOpen} onClose={closeDialog} fullWidth disableScrollLock>
      {/* Dialog Title */}
      <DialogTitle className="pt-16 md:pt-10 bg-paper dark:bg-dark-paper">
        Select Location
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent className="bg-paper dark:bg-dark-paper">
        <GeoSelect/>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions className="bg-paper dark:bg-dark-paper">
        <Button onClick={closeDialog} color="primary">
          Close
        </Button>
        <Button
        //   onClick={() => (isEditMode ? onSaveChanges() : onAddWork())}
        //   disabled={isAddButtonDisabled()}
          color="primary"
        >
          {isEditMode ? "Save Changes" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GeoDialog;
