import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { Switch } from "../../../components/sharedComponents/Switch";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import useMediaQuery from "../../../components/responsiveness/useMediaQuery";
import { colors } from "../../../utils/theme";

interface WorkDialogProps {
  isOpen: boolean;
  jobTitleInput: string;
  setJobTitleInput: (value: string) => void;
  workPlaceInput: string;
  setWorkPlaceInput: (value: string) => void;
  primary: boolean;
  setPrimary: (value: boolean) => void;
  startedAtInput: Dayjs;
  setStartedAtInput: (value: Dayjs) => void;
  closeDialog: () => void;
  onSaveChanges: () => void;
  onAddWork: () => void;
  isEditMode: boolean;
  isAddButtonDisabled: () => boolean;
}

const WorkDialog: React.FC<WorkDialogProps> = ({
  isOpen,
  jobTitleInput,
  setJobTitleInput,
  workPlaceInput,
  setWorkPlaceInput,
  primary,
  setPrimary,
  startedAtInput,
  setStartedAtInput,
  closeDialog,
  onSaveChanges,
  onAddWork,
  isEditMode,
  isAddButtonDisabled,
}) => {
  const isMobile = useMediaQuery(600);

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      fullScreen={isMobile}
      fullWidth
      disableScrollLock
    >
      <DialogTitle className="pt-16 md:pt-10 bg-paper dark:bg-dark-paper">
        Add Work
      </DialogTitle>
      <DialogContent className="bg-paper dark:bg-dark-paper">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* First Column */}
          <div className="flex flex-col">
            <div className="flex flex-row my-3 md:my-4 items-center">
              <Typography className="mr-6 min-w-[80px] text-black dark:text-dark-text">
                Job Title:
              </Typography>
              <TextField
                // sx={{ borderRadius: "100px" }}
                InputProps={{
                  sx: { borderRadius: "100px", cursor: "default" },
                  inputProps: {
                    className: `py-1 input-no-ring lg:text-sm xs:text-xs dark:bg-dark-paper-light
                dark:placeholder:text-neutral-400 dark:text-dark-text
                 text-black rounded-full
               `,
                  },
                }}
                value={jobTitleInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setJobTitleInput(e.target.value)
                }
              />
            </div>
            <div className="flex flex-row my-3 md:my-4 items-center">
              <Typography className="mr-6 min-w-[80px] text-black dark:text-dark-text">
                At:{" "}
              </Typography>
              <TextField
                sx={{ borderRadius: "100px" }}
                InputProps={{
                  sx: { borderRadius: "100px", cursor: "default" },
                  inputProps: {
                    className: `py-1 input-no-ring lg:text-sm xs:text-xs dark:bg-dark-paper-light
                dark:placeholder:text-neutral-400 dark:text-dark-text
                 text-black rounded-full
               `,
                  },
                }}
                value={workPlaceInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setWorkPlaceInput(e.target.value)
                }
              />
            </div>
          </div>

          {/* Second Column */}
          <div
            className={`flex flex-col justify-center ${
              isMobile ? "items-start" : "items-center"
            }`}
          >
            <div className="flex flex-row my-3 md:my-4 items-center">
              <Typography className="mr-6 min-w-[80px] text-black dark:text-dark-text">
                Make Primary
              </Typography>
              <Switch
                checked={primary}
                onChange={(value) => setPrimary(value)}
              />
            </div>
          </div>
        </div>

        {/* Date Picker (spanning both columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex flex-col col-span-2 my-3 md:my-4">
            <Typography className="w-full pb-3 text-black dark:text-dark-text">
              Since:{" "}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="flex w-full md:w-1/2"
                defaultValue={dayjs().startOf("month")}
                value={startedAtInput}
                onChange={(value: Dayjs | null) =>
                  setStartedAtInput(
                    value ? value.startOf("month") : dayjs().startOf("month")
                  )
                }
                // label="Month and Year"
                views={["month", "year"]}
                slotProps={{
                  textField: {
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        color: colors.primary, // Input text color
                        borderRadius: "20px",
                        "& fieldset": {
                          borderColor: "rgb(209 213 219)", // Border color
                        },
                        "& .MuiInputBase-input": { borderRadius: "20px" },
                        "&:hover fieldset": {
                          borderColor: colors.primary, // Border color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: colors.primary, // Border color when focused
                        },
                      },
                    },
                    InputProps: { sx: { backgroundColor: colors.primary } },
                    InputLabelProps: {
                      sx: {
                        color: colors.darkText,
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        borderRadius: "100px",
                        paddingX: "20px",
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="bg-paper dark:bg-dark-paper">
        <Button onClick={closeDialog} color="primary">
          Close
        </Button>
        <Button
          onClick={() => (isEditMode ? onSaveChanges() : onAddWork())}
          disabled={isAddButtonDisabled()}
          color="primary"
        >
          {isEditMode ? "Save Changes" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkDialog;
