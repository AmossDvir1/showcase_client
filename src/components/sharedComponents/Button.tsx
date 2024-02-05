import React from "react";
import {
  ButtonProps,
  Grid,
  Button as MuiButton,
  Typography,
} from "@mui/material";
import Loader from "./Loader";

type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface Props extends ButtonProps {
  btnsize?: Sizes;
  bgcolor?: string;
  transparent?: boolean;
  loading?: boolean;
  textclassname?: string;
  round?: boolean;
  bgcolorhover?: string;
  loadingText?: string;
  bgdisabledcolor?: string;
}
export const Button: React.FC<Props> = ({
  loading,
  btnsize,
  bgcolor,
  transparent,
  children,
  textclassname,
  className,
  round,
  bgcolorhover,
  loadingText,
  bgdisabledcolor,
  ...rest
}) => {
  let bgSizeY = "py-2";
  let bgSizeX = "px-7";
  let txtSize = "text-base";
  let fontWeight = "font-medium";
  let bgColor = transparent
    ? "bg-transparent"
    : bgcolor
    ? bgcolor
    : "bg-primary";
  switch (btnsize) {
    case "xs":
      bgSizeY = "py-0.5";
      bgSizeX = "px-2";
      txtSize = "text-sm";
      fontWeight = "font-thin";
      break;

    case "sm":
      bgSizeY = "py-1";
      bgSizeX = "px-5";
      txtSize = "text-base";
      fontWeight = "font-normal";
      break;

    case "md":
      bgSizeY = "py-2";
      bgSizeX = "px-7";
      txtSize = "text-lg";
      fontWeight = "font-medium";
      break;

    case "lg":
      bgSizeY = "py-2.5";
      bgSizeX = "px-8";
      txtSize = "text-xl";
      fontWeight = "font-medium";
      break;

    case "xl":
      bgSizeY = "py-3";
      bgSizeX = "px-9";
      txtSize = "text-2xl";
      fontWeight = "font-medium";
      break;

    case "2xl":
      bgSizeY = "py-4";
      bgSizeX = "px-10";
      txtSize = "text-3xl";
      fontWeight = "font-semibold";
      break;
  }

  return loading ? (
    <MuiButton
      disableRipple
      disabled
      variant="text"
      sx={{"&[disabled]": {
        background: `${
          bgdisabledcolor ? bgdisabledcolor : "rgb(117,115,197,0.25)"
        } !important`,
        color: "#c0c0c0 !important",
      },}}
      {...rest}
      className={`${bgColor} ${
        bgcolorhover ? "hover:" + bgcolorhover : "hover:bg-primary-light"
      } ${bgSizeY} ${bgSizeX} ${
        round ? "rounded-full" : "rounded-none"
      } w-fit cursor-default ${className}`}
    >
      <Grid
        container
        className="justify-center items-center text-center flex flex-row"
      >
          <Loader/>
        <Typography
          className={`${fontWeight} text-[rgb(255,255,255,0.5)] ${txtSize} ${textclassname}`}
        >
          {loadingText ?? "Loading..."}
        </Typography>
      </Grid>
    </MuiButton>
  ) : (
    <MuiButton
      disableRipple
      variant="text"
      sx={{
        "&[disabled]": {
          background: `${
            bgdisabledcolor ? bgdisabledcolor : "rgb(117,115,197,0.25)"
          } !important`,
          color: "#c0c0c0 !important",
        },
      }}
      {...rest}
      className={` ${bgColor} ${
        bgcolorhover ? bgcolorhover : "hover:bg-primary-light"
      } ${bgSizeY} ${bgSizeX} ${
        round ? "rounded-full" : "rounded-none"
      } w-fit cursor-default ${className}`}
    >
      <div
        className={`${fontWeight} text-white text-center ${txtSize} ${textclassname}`}
      >
        {children}
      </div>
    </MuiButton>
  );
};
