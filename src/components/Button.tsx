import React from "react";
import {
  ButtonProps,
  Grid,
  Button as MuiButton,
  Typography,
} from "@mui/material";

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
        <svg
          aria-hidden="true"
          className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-700 dark:fill-gray-300"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
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
