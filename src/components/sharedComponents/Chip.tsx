import React from "react";
import { Avatar, ChipProps, Chip as MuiChip } from "@mui/material/";
import CancelIcon from "@mui/icons-material/Cancel";

interface Props extends ChipProps {
  label: string;
  id?: string;
  outlineColor?: string;
  textColor?: string;
  backgroundColor?: string;
  radius?: number;
  iconSrc?: string;
  onChipDelete?: (e: any, label: string) => void;
}

export const Chip: React.FC<Props> = ({
  label,
  id,
  outlineColor,
  backgroundColor,
  textColor,
  radius,
  onChipDelete,
  iconSrc,
  ...rest
}) => {
  return (
    <MuiChip
      {...(onChipDelete ? { deleteIcon: <CancelIcon /> } : {})}
      onMouseDown={(event) => event.stopPropagation()}
      {...(onChipDelete ? { onDelete: (e) => onChipDelete(e, label) } : {})}
      key={id ?? ""}
      className="cursor-default"
      {...(iconSrc
        ? {
            avatar: (
              <Avatar
                sx={{
                  borderWidth: "1px",
                  borderColor: outlineColor,
                  borderStyle: "solid",
                }}
                className={`bg-transparent`}
                alt="Natacha"
                src={iconSrc}
              />
            ),
          }
        : {})}
      label={label}
      
      sx={{
        cursor: 'default',
        color: textColor ?? "black",
        borderWidth: "1px",
        borderStyle: 'solid',
        borderColor: outlineColor || "#a8a8a8",
        backgroundColor: backgroundColor ?? "#F7F7F7",
        ...(radius !== null && {
          "&.MuiChip-root": {
            borderRadius: `${radius}px`,
          },
        }),
      }}
      {...rest}
    />
  );
};
