import React, { useContext, useEffect, useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box, Typography, MobileStepper } from "@mui/material";
import { Button } from "../../components/sharedComponents/Button";
import { CreateProjectForm } from "./pages/CreateProjectForm";
import { createProject } from "../../controllers/createProjectController";
import { Stepper } from "./Stepper";
import { TechnologiesTagsPage } from "./pages/technologiesPage/TechnologiesTagsPage";
import { Popup } from "../../components/sharedComponents/Popup";
import { CreateProjectProvider } from "../../context/CreateProjectContext";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: (
    event: React.MouseEvent<HTMLButtonElement>,
    reason?: string
  ) => void;
}

export const CreateProjectDialog: React.FC<Props> = ({ open, onClose }) => {
  const isDirty = false;
  const [data, setData] = useState<{
    projectName: string;
    projectDesc: string;
    isExposed: string;
    technologies: string[];
  }>({
    projectName: "",
    projectDesc: "",
    isExposed: "",
    technologies: [],
  });

  const steps = useMemo(
    () => [
      {
        label: "Project Details",
        content: <CreateProjectForm setData={setData}></CreateProjectForm>,
      },
      {
        label: "Technologies",
        content: <TechnologiesTagsPage></TechnologiesTagsPage>,
      },
      {
        label: "Connect Your GitHub Account",
        content: (
          <Typography>
            "An ad group contains one or more ads which target a shared set of
            keywords."
          </Typography>
        ),
      },
    ],
    []
  );

  useEffect(() => setMaxSteps(steps.length), [steps]);
  const navigate = useNavigate();
  const [createLoading, setCreateLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [maxSteps, setMaxSteps] = useState<number>(steps.length);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onSubmit = async () => {
    console.log(data);
    setCreateLoading(true);
    const res = await createProject({ data });
    setCreateLoading(false);
    if (res) {
      navigate("/my-projects");
      navigate(0);
    }
  };
  const onNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const onBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <CreateProjectProvider>
      <Box>
        <Dialog
          fullScreen={fullScreen}
          // maxWidth={"xl"}
          open={open}
          onClose={onClose}
          PaperProps={{
            className:
              "w-[1000px] h-[800px] sm:max-h-[85%] xs:max-h-[95%] bg-zinc-100",
          }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Create New Project"}
          </DialogTitle>
          <Divider></Divider>
          <DialogContent>
            <Stepper
              activeStep={activeStep}
              steps={steps}
              // setData={setData}
            ></Stepper>
          </DialogContent>
          <DialogActions>
            <Box className="flex-col w-full">
              <Divider />
              <Box className="flex">
                <MobileStepper
                  className="flex justify-between w-full bg-zinc-100"
                  variant="progress"
                  steps={maxSteps}
                  position="static"
                  activeStep={activeStep}
                  nextButton={
                    <Button
                      // round
                      btnsize="xs"
                      onClick={onNext}
                      disabled={activeStep === maxSteps - 1}
                    >
                      <Box className="flex items-center">
                        Next
                        <KeyboardArrowRight />
                      </Box>
                    </Button>
                  }
                  backButton={
                    <Button
                      btnsize="xs"
                      // round
                      onClick={onBack}
                      disabled={activeStep === 0}
                    >
                      <Box className="flex items-center">
                        <KeyboardArrowLeft />
                        Back
                      </Box>
                    </Button>
                  }
                />
              </Box>
              <Divider />
              <Box className="flex justify-between w-full mt-2">
                {isDirty ? (
                  <Popup label="close"></Popup>
                ) : (
                  <Button
                    className="ml-2"
                    bgcolor="bg-[rgb(204,0,0)]"
                    bgcolorhover="hover:bg-[rgb(230,0,0)]"
                    round
                    // autoFocus
                    btnsize="sm"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                )}
                <Button
                  className="mr-2 bg-green-600"
                  bgcolor="bg-green-600"
                  bgcolorhover="hover:bg-green-500"
                  bgdisabledcolor="rgb(22,163,74,0.25)"
                  round
                  btnsize="sm"
                  onClick={onSubmit}
                  loading={createLoading}
                  loadingText="Creating"
                  // autoFocus
                  type="submit"
                  // disabled={!(values)}
                  // disabled={!getValues()}
                >
                  Create
                </Button>
              </Box>
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </CreateProjectProvider>
  );
};
