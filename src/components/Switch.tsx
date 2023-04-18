import React, { useEffect, useState } from "react";
import {
  FormControlLabel,
  Switch as MuiSwitch,
  SwitchProps,
} from "@mui/material";

interface Props extends SwitchProps {
  setSwitch?: (value: boolean) => void;
  label?: string;
  value: boolean;
  register?: any;
  name?: string
}

export const Switch: React.FC<Props> = (props) => {
  const { setSwitch, label, value, register, name, ...rest } = props;
  const [checked, setChecked] = useState<boolean>(value);

  useEffect(() => setChecked(value), [value]);
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
      // onClick={() => setChecked(!checked)}
      color="primary"
      {...(name && {...register(name)})}

      
      {...rest}
    ></MuiSwitch>
  );
};
