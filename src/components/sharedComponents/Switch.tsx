import React from "react";
import {
  FormControlLabel,
  Switch as MuiSwitch,
  styled,
  SwitchProps,
} from "@mui/material";
import { keyframes } from "@emotion/react"; // For animations
import SaveIcon from "@mui/icons-material/Save";
import Typography from "./Typography";
import useMediaQuery from "../responsiveness/useMediaQuery";

interface Props extends Omit<SwitchProps, "onChange"> {
  label?: string;
  onChange: (checked: boolean) => void;
  type?: "ai" | "theme" | "autoSave" | "default";
}

const AutoSaveSwitch = styled(MuiSwitch)(
  ({ theme, size = "small", checked }) => ({
    padding: size === "small" ? 0 : 0,
    width: size === "small" ? 54 : 70,
    height: size === "small" ? 30 : 38,
    "& .MuiSwitch-switchBase": {
      padding: 2,
      transform: size === "small" ? "translateX(0px)" : "translateX(3px)",
      "&.Mui-checked": {
        transform: size === "small" ? "translateX(24px)" : "translateX(30px)",
      },
    },
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      backgroundColor: "#aab4be",
      opacity: 1,
      ...theme.applyStyles("dark", {
        backgroundColor: "#8796A5",
      }),
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform:
          checked || size === "medium"
            ? "translateY(-50%)"
            : "translateY(-60%)",
        width: size === "small" ? 16 : 20,
        height: size === "small" ? 16 : 20,
      },
      "&::before": {
        backgroundImage: checked
          ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512"><path fill="${theme.palette.background}" d="m433.941 129.941-83.882-83.882a48 48 0 0 0 -33.941-14.059h-268.118c-26.51 0-48 21.49-48 48v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-268.118a48 48 0 0 0 -14.059-33.941zm-209.941 286.059c-35.346 0-64-28.654-64-64s28.654-64 64-64 64 28.654 64 64-28.654 64-64 64zm96-304.52v100.52c0 6.627-5.373 12-12 12h-232c-6.627 0-12-5.373-12-12v-104c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48a11.996 11.996 0 0 1 3.515 8.485z"/></svg>')`
          : "",
        left: size === "small" ? 8 : 11,
      },
      "&::after": {
        backgroundImage: checked
          ? ""
          : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="${theme.palette.background}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: size === "small" ? 8 : 11,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: size === "small" ? 20 : 22,
      height: size === "small" ? 20 : 22,
      margin: size === "small" ? 3 : 6,
    },
  })
);

const DarkLightSwitch = styled(MuiSwitch)(({ theme, size = "medium" }) => ({
  width: size === "small" ? 44 : 62,
  height: size === "small" ? 26 : 34,
  padding: size === "small" ? 5 : 7,
  "& .MuiSwitch-switchBase": {
    margin: size === "small" ? 0 : 1,
    padding: 0,
    transform: size === "small" ? "translateX(2px)" : "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: size === "small" ? "translateX(20px)" : "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#ffc300",
    width: size === "small" ? 24 : 32,
    height: size === "small" ? 24 : 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#003892",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));

const AISwitch = styled(MuiSwitch)(({ theme, size = "medium" }) => ({
  width: size === "small" ? 44 : 62,
  height: size === "small" ? 26 : 34,
  padding: size === "small" ? 5 : 7,
  "& .MuiSwitch-switchBase": {
    margin: size === "small" ? 0 : 1,
    padding: 0,
    transform: size === "small" ? "translateX(2px)" : "translateX(6px)",
    "&.Mui-checked": {
      transform: size === "small" ? "translateX(20px)" : "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7 11L8.08036 8.08036L11 7L8.08036 5.91964L7 3L5.91964 5.91964L3 7L5.91964 8.08036L7 11Z" stroke="white" stroke-width="2" stroke-linecap="" stroke-linejoin=""/> <path d="M16.5 15L17.7154 11.7154L21 10.5L17.7154 9.28459L16.5 6L15.2846 9.28459L12 10.5L15.2846 11.7154L16.5 15Z" stroke="white" stroke-width="2" stroke-linecap="" stroke-linejoin=""/> <path d="M10 21L11.0804 18.0804L14 17L11.0804 15.9196L10 13L8.91964 15.9196L6 17L8.91964 18.0804L10 21Z" stroke="white" stroke-width="2" stroke-linecap="" stroke-linejoin=""/> </svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    // backgroundColor: colors.primary,
    width: size === "small" ? 24 : 32,
    height: size === "small" ? 24 : 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));

export const Switch: React.FC<Props> = (props) => {
  const {
    label,
    onChange,
    value,
    name,
    checked,
    type = "default",
    size = "medium",
    ...rest
  } = props;

  const isMobile = useMediaQuery(500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const renderSwitch = () => {
    switch (type) {
      case "ai":
        return (
          <AISwitch
            value="active"
            color="primary"
            onChange={handleChange}
            checked={checked}
            {...rest}
          />
        );
      case "theme":
        return (
          <DarkLightSwitch
            value="active"
            color="primary"
            onChange={handleChange}
            checked={checked}
            {...rest}
          />
        );
      case "autoSave":
        return (
          <AutoSaveSwitch
            value="active"
            color="primary"
            onChange={handleChange}
            checked={checked}
            size={size}
            {...rest}
          />
        );
      default:
        return (
          <MuiSwitch
            value="active"
            color="primary"
            onChange={handleChange}
            checked={checked}
            {...rest}
          />
        );
    }
  };

  return (
    <FormControlLabel
      value="top"
      className="p-0 m-0"
      labelPlacement="top"
      label={
        <Typography className={`pb-1 ${isMobile ? "text-xs" : "text-sm"}`}>
          {label ?? ""}
        </Typography>
      }
      control={renderSwitch()}
    />
  );
};
