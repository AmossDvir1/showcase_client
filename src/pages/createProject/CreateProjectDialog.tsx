import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Controller, FormProvider, useForm } from "react-hook-form";

import { CreateProjectForm } from "./pages/CreateProjectForm";
import { createProject } from "../../controllers/createProjectController";
import { Stepper } from "./Stepper";
import { Box, Typography, MobileStepper } from "@mui/material";
import { TechnologiesTagsPage } from "./pages/technologiesPage/TechnologiesTagsPage";
import { Popup } from "../../components/Popup";

interface Props {
  open: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement>, reason?: string) => void
}

export const CreateProjectDialog: React.FC<Props> = ({ open, onClose }) => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectDesc, setProjectDesc] = useState<string>("");
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);
  const methods = useForm<FormData>();
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { isDirty, dirtyFields },
  } = methods;
  useEffect(() => console.log(isDirty), [isDirty]);
  // const isDirty = false;

  const steps = useMemo(
    () => [
      {
        label: "Project Details",
        content: (
          <CreateProjectForm
            onProjectNameChange={setProjectName}
          ></CreateProjectForm>
        ),
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
    [setProjectName]
  );

  // useEffect(() => console.log(isDirty), [isDirty]);

  useEffect(() => setMaxSteps(steps.length), [steps]);

  const [createLoading, setCreateLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [maxSteps, setMaxSteps] = useState<number>(steps.length);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onSubmit = async (formValues: any) => {
    console.log(formValues);
    setCreateLoading(true);
    const res = await createProject({ projectName });
    setCreateLoading(false);
  };
  const onNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const onBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box>
      {/* <Button onClick={onClickOpen}>+ Create</Button> */}
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
          <FormProvider {...methods}>
            <Stepper
              activeStep={activeStep}
              steps={steps}
              onProjectNameChange={setProjectName}
              setCurrentStep={setActiveStep}
            ></Stepper>
          </FormProvider>
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
                onClick={handleSubmit(onSubmit)}
                loading={createLoading}
                loadingText="Creating"
                // autoFocus
                type="submit"
                // disabled={!projectName}
                // disabled={!getValues()}
              >
                Create
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
