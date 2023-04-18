import React from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  steps: Array<{ label: string; content: JSX.Element }>;
  activeStep: number;
  onProjectNameChange?: (value: string) => void;
  onBackStep?: (value: string) => void;
  onNextStep?: (value: string) => void;
  setCurrentStep?: (value: number) => void;
}

export const Stepper: React.FC<Props> = ({ steps, activeStep }) => {
  return (
    <Box>
      <Typography className="text-xl">{steps[activeStep].label}</Typography>
      <Box className="items-center justify-center">
        {steps.map((step, index) => (
          <div key={index} hidden={index !== activeStep}>
            {step.content}
          </div>
        ))}
      </Box>
    </Box>
  );
};
