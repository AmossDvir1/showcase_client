import React from "react";
import { Tooltip as MuiTooltip, TooltipProps } from "@mui/material";

interface Props extends TooltipProps{
isError?:boolean;
  }
export const Tooltip: React.FC<Props> = (props) => {
  return (
    <MuiTooltip
      arrow
      title={props.title}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: `${props.isError ? "rgb(185 28 28)":'#7573C5'}`,
            "& .MuiTooltip-arrow": {
              color: `${props.isError? "rgb(185 28 28)":"#7573C5"}`,
            },
          },
        },
      }}
    >
      {props.children}
    </MuiTooltip>
  );
};
