import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import { TextField } from "../../components/sharedComponents/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Switch } from "../../components/sharedComponents/Switch";
import { extractMonthYear } from "../../utils/utils";
import { Chip } from "../../components/sharedComponents/Chip";
import useMediaQuery from "../../components/responsiveness/useMediaQuery";
interface WorkSettingsProps {
  workList: IWork[];
  setWorkList: React.Dispatch<React.SetStateAction<IWork[]>>;
}

const WorkSettings: React.FC<WorkSettingsProps> = ({
  setWorkList,
  workList = [],
}) => {
  const [isWorkDialogOpen, setIsWorkDialogOpen] = useState(false);
  const [jobTitleInput, setJobTitleInput] = useState<string>("");
  const [workPlaceInput, setWorkPlaceInput] = useState<string>("");
  const [startedAtInput, setStartedAtInput] = useState<Dayjs>(dayjs());
  const [primary, setPrimary] = useState<boolean>(true);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [rowIndexInEditMode, setRowIndexInEditMode] = useState<number | null>(
    null
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const isMobile = useMediaQuery(600);

  const openWorkDialog = () => setIsWorkDialogOpen(true);
  const closeWorkDialog = () => setIsWorkDialogOpen(false);

  const isAddButtonDisabled = (): boolean => {
    return !jobTitleInput || !workPlaceInput || !startedAtInput;
  };

  const resetInputs = () => {
    setJobTitleInput("");
    setWorkPlaceInput("");
    setStartedAtInput(dayjs());
    setPrimary(true);
  };

  const editRow = (index: number) => {
    const work = workList[index];
    setJobTitleInput(work.jobTitle);
    setWorkPlaceInput(work.workPlace);
    setStartedAtInput(dayjs(work.startedAt));
    setPrimary(work.primary);
    openWorkDialog();
    setRowIndexInEditMode(index);
    setIsEditMode(true);
  };

  const removeRow = (index: number) => {
    setWorkList((prev) => {
      prev.splice(index, 1);
      return prev;
    });
  };

  const onSaveChanges = () => {
    if (rowIndexInEditMode !== null) {
      setWorkList((prev) => {
        prev[rowIndexInEditMode] = {
          jobTitle: jobTitleInput,
          workPlace: workPlaceInput,
          startedAt: startedAtInput.toDate(),
          primary,
        };

        return prev;
      });
    }
    closeWorkDialog();
    resetInputs();
    setRowIndexInEditMode(null);
    setIsEditMode(false);
  };

  const onAddWork = () => {
    setWorkList((prev) => [
      ...prev,
      {
        jobTitle: jobTitleInput,
        workPlace: workPlaceInput,
        startedAt: startedAtInput.toDate(),
        primary,
      },
    ]);
    closeWorkDialog();
    resetInputs();
  };

  return (
    <div>
      <FormControl fullWidth className="mb-6">
        <div className="flex flex-col">
          <Typography className="text-black text-xl">Work</Typography>
          <div className="flex flex-col ">
            {workList?.length > 0 ? (
              workList.map((work, index) => (
                <div
                  className="flex my-2 items-center justify-between hover:bg-gray-100 p-2 rounded transition duration-200"
                  onMouseEnter={() => setHoveredRow(index)} // Set hovered row
                  onMouseLeave={() => setHoveredRow(null)} // Reset on leave
                  key={index}
                >
                  <div className="flex flex-col w-[70%]">
                    <Typography className="text-black text-sm">{`${work.jobTitle} at ${work.workPlace}`}</Typography>
                    <Typography className="text-gray-400 text-xs">
                      {`Since ${extractMonthYear(work.startedAt)}`}
                    </Typography>
                  </div>
                  <div className="flex items-center justify-end">
                    {work.primary && (
                      <Chip
                        className="text-xs ml-3"
                        size="small"
                        backgroundColor="#7573C5"
                        label="PRIMARY"
                        outlineColor="#7573C5"
                        textColor="white"
                      ></Chip>
                    )}

                    {/* Edit icon */}
                    <div
                      className="ml-2 w-8 flex justify-center items-center"
                      style={{ transition: "opacity 0.3s ease" }} // Smooth transition
                    >
                      <IconButton
                        sx={{
                          opacity: hoveredRow === index ? 1 : 0, // Fade in/out
                          pointerEvents: hoveredRow === index ? "auto" : "none", // Prevent clicks when hidden
                        }}
                        onClick={() => editRow(index)}
                        className="transition duration-200 ml-2"
                      >
                        <EditIcon />
                      </IconButton>
                    </div>

                    {/* Remove icon */}
                    <div
                      className="ml-2 w-8 flex justify-center items-center"
                      style={{ transition: "opacity 0.3s ease" }} // Smooth transition
                    >
                      <IconButton
                        sx={{
                          opacity: hoveredRow === index ? 1 : 0, // Fade in/out
                          pointerEvents: hoveredRow === index ? "auto" : "none", // Prevent clicks when hidden
                        }}
                        onClick={() => removeRow(index)}
                        className="transition duration-200 ml-2"
                      >
                        <RemoveIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Typography className="text-black text-sm">
                No work settings
              </Typography>
            )}
            <div className="flex flex-row justify-center items-center">
              <div className="cursor-pointer" onClick={openWorkDialog}>
              <Typography className="text-black text-sm">Add work</Typography></div>
              <IconButton
                onClick={openWorkDialog}
                disableRipple
                disableTouchRipple
                disableFocusRipple
              >
                <AddCircleOutlineIcon></AddCircleOutlineIcon>
              </IconButton>
            </div>
          </div>
        </div>
      </FormControl>
      {/*  Add work dialog */}
      <Dialog
        open={isWorkDialogOpen}
        onClose={closeWorkDialog}
        fullScreen={isMobile}
        fullWidth
        disableScrollLock
      >
        <DialogTitle className="pt-20">Add Work</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* First Column */}
            <div className="flex flex-col">
              <div className="flex flex-row my-3 md:my-4 items-center">
                <Typography className="mr-6 min-w-[80px]">
                  Job Title:
                </Typography>
                <TextField
                  value={jobTitleInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setJobTitleInput(e.target.value)
                  }
                />
              </div>
              <div className="flex flex-row my-3 md:my-4 items-center">
                <Typography className="mr-6 min-w-[80px]">At: </Typography>
                <TextField
                  value={workPlaceInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setWorkPlaceInput(e.target.value)
                  }
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row my-3 md:my-4 items-center">
                <Typography className="mr-6 min-w-[80px]">
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
              <Typography className="w-full pb-3">Since: </Typography>
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
                  label="Month and Year"
                  views={["month", "year"]}
                />
              </LocalizationProvider>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeWorkDialog} color="primary">
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
    </div>
  );
};

export default WorkSettings;
