import React from "react";
import { Tooltip as MuiTooltip, TooltipProps } from "@mui/material";

interface Props extends TooltipProps{
isError?:boolean;
title: string;
  }

export const Tooltip: React.FC<Props> = ({isError, title, children, ...rest}) => {
  return (
    <MuiTooltip
      arrow
      title={title}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: `${isError ? "rgb(185 28 28)":'#7573C5'}`,
            "& .MuiTooltip-arrow": {
              color: `${isError? "rgb(185 28 28)":"#7573C5"}`,
            },
          },
        },
      }}
    >
      {children}
    </MuiTooltip>
  );
};
