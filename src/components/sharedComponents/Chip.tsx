import React from "react";
import { Avatar, ChipProps, Chip as MuiChip } from "@mui/material/";
import CancelIcon from "@mui/icons-material/Cancel";

interface Props extends ChipProps {
  label: string;
  id: string;
  outlineColor?: string;
  radius?: number;
  iconSrc?: string;
  onChipDelete?: (e: any, label: string) => void;
}

export const Chip: React.FC<Props> = ({
  label,
  id,
  outlineColor = "grey",
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
      key={id}
      {...(iconSrc
        ? {
            avatar: (
              <Avatar
                sx={{
                  borderWidth: "1px",
                  borderColor: outlineColor,
                  borderStyle: "solid",
                }}
                className={`bg-transparent border-[1px] border-${outlineColor} border-solid`}
                alt="Natacha"
                src={iconSrc}
              />
            ),
          }
        : {})}
      label={label}
      sx={{
        color: "black",
        borderWidth: "1px",

        borderColor: outlineColor,
        backgroundColor: "#F7F7F7",
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
