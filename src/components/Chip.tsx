import React from "react";
import {ChipProps, Chip as MuiChip} from "@mui/material/";
import CancelIcon from "@mui/icons-material/Cancel";

interface Props extends ChipProps {
    value: string;
    labelColor: string;
    bgColor: string;
    onChipDelete?: (e:any, value:string) => void;

}
export const Chip: React.FC<Props>  = ({ value, labelColor, bgColor, onChipDelete, ...rest }) => {
  return (
    <MuiChip
      {...(onChipDelete ? { deleteIcon: <CancelIcon /> } : {})}
      onMouseDown={(event) => event.stopPropagation()}
      {...(onChipDelete ? { onDelete: (e) => onChipDelete(e, value) } : {})}
      key={value}
      label={value}
      sx={{
        color: labelColor,
        backgroundColor: bgColor,
      }}
      {...rest}
    />
  );
};
