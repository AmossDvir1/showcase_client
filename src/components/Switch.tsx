import React, { useEffect, useState } from "react";
import {
  FormControlLabel,
  Switch as MuiSwitch,
  SwitchProps,
} from "@mui/material";

interface Props extends SwitchProps {
  setSwitch?: (value: boolean) => void;
  label?: string;
  value?: boolean;
  name?: string;
}

export const Switch: React.FC<Props> = (props) => {
  const { setSwitch, label, ...rest } = props;
  useEffect(
    () => setSwitch && setSwitch(props.checked ?? false),
    [props?.checked, setSwitch]
  );

  return (
    <FormControlLabel
      value="top"
      labelPlacement="top"
      label={label ?? ""}
      control={<MuiSwitch color="primary" {...rest}></MuiSwitch>}
    ></FormControlLabel>
  );
};
