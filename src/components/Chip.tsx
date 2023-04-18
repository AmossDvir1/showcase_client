import React from "react";
import {ChipProps, Chip as MuiChip} from "@mui/material/";
import CancelIcon from "@mui/icons-material/Cancel";

interface Props extends ChipProps {
    value: string;
    labelColor: string;
    bgColor: string;
    onGenreDelete?: (e:any, value:string) => void;

}
export const Chip: React.FC<Props>  = ({ value, labelColor, bgColor, onGenreDelete, ...rest }) => {
  return (
    <MuiChip
      {...(onGenreDelete ? { deleteIcon: <CancelIcon /> } : {})}
      onMouseDown={(event) => event.stopPropagation()}
      {...(onGenreDelete ? { onDelete: (e) => onGenreDelete(e, value) } : {})}
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
