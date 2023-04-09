import React, { useEffect, useState } from "react";
import {
  Box,
  FormControlLabel,
  Switch as MuiSwitch,
  SwitchProps,
} from "@mui/material";

interface Props extends SwitchProps {
  setSwitch?: (value: boolean) => void;
  label?: string;
}

export const Switch: React.FC<Props> = (props) => {
  const { setSwitch, label, ...rest } = props;
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  useEffect(() => setSwitch && setSwitch(checked), [checked, setSwitch]);

  return label ? (
    <FormControlLabel
      value="top"
      control={
        <MuiSwitch
          checked={checked}
          onChange={handleChange}
          color="primary"
          {...rest}
        ></MuiSwitch>
      }
      label={label}
      labelPlacement="top"
    ></FormControlLabel>
  ) : (
    <MuiSwitch
      checked={checked}
      onClick={() => setChecked(!checked)}
      color="primary"
      {...rest}
    ></MuiSwitch>
  );
};
