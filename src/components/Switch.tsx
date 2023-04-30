import React from "react";
import {
  FormControlLabel,
  Switch as MuiSwitch,
  SwitchProps,
} from "@mui/material";

interface Props extends SwitchProps {
  label?: string;
  value?: boolean;
  name?: string;
}

export const Switch: React.FC<Props> = (props) => {
  const { label, ...rest } = props;

  return (
    <FormControlLabel
      value="top"
      labelPlacement="top"
      label={label ?? ""}
      control={<MuiSwitch color="primary" {...rest}></MuiSwitch>}
    ></FormControlLabel>
  );
};
