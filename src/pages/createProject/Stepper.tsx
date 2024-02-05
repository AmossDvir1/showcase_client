import React, { Dispatch, SetStateAction } from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  steps: Array<{ label: string; content: JSX.Element }>;
  activeStep: number;
  // setData: Dispatch<SetStateAction<{ projectName: string; projectDesc: string; isExposed: string; technologies: []}>>;
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
