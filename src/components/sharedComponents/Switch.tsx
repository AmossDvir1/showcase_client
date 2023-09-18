import React from "react";
import {
  FormControlLabel,
  Switch as MuiSwitch,
  SwitchProps,
} from "@mui/material";

interface Props extends Omit<SwitchProps, "onChange"> {
  label?: string;
  onChange: (checked: boolean) => void;
}

export const Switch: React.FC<Props> = (props) => {
  const { label, onChange, value, name, checked, ...rest } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <FormControlLabel
      value="top"
      labelPlacement="top"
      label={label ?? ""}
      control={
        <MuiSwitch
          value="active"
          color="primary"
          onChange={handleChange}
          checked={checked}
          {...rest}
        ></MuiSwitch>
      }
    ></FormControlLabel>
  );
};
