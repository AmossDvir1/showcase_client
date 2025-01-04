import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import useMediaQuery from "../responsiveness/useMediaQuery";
import { Grid, Typography } from "@mui/material";
import Loader from "./Loader";
import { colors } from "../../utils/theme";

// CustomButtonProps - defines the custom props you want to pass to your button
interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  rounded?: boolean; // Determines if the button is rounded
  glow?: boolean;
  className?: string;
  loading?: boolean;
  loadingText?: string;
  uppercase?: boolean;
  disabled?: boolean;
}

// Apply styled function to MUI Button
const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "glow", // Exclude glow from being forwarded to MUI Button
})<CustomButtonProps>(({ theme, variant, glow, size }) => ({
  textTransform: "none",
  fontWeight: 400,
  position: "relative",
  overflow: "hidden",
  padding:
    size === "small"
      ? "0.4rem 1rem"
      : size === "large"
      ? "1rem 2rem"
      : "0.8rem 1.6rem", // Adjust padding based on size
  fontSize:
    size === "small" ? "0.8rem" : size === "large" ? "1.4rem" : "1.1rem", // Adjust font size based on size
  transition: "all 0.3s ease-in-out",
  background:
    theme.palette.mode === "dark" && variant === "contained"
      ? theme.palette.primary.main
      : variant === "contained"
      ? "#7573C5"
      : "transparent", // Default background
  color:
    variant === "outlined"
      ? theme.palette.primary.main
      : theme.palette.mode === "dark"
      ? "#ffffff"
      : "#ffffff", // Default text color
  border:
    variant === "outlined" ? size === "small" ? `2px solid ${theme.palette.primary.main}`:`3px solid ${theme.palette.primary.main}` : "none", // Default border
  boxShadow: "none",

  "&:hover": {
    background: variant === "outlined" ? "transparent" : "#7573C5",
    border: variant === "outlined" ? size === "small" ? "2px solid #b2adff" : "3px solid #b2adff" : "none",
    color:
      variant === "outlined"
        ? theme.palette.primary.main
        : theme.palette.mode === "dark"
        ? "#ffffff"
        : "#ffffff",
    boxShadow:
      variant === "outlined" && glow && theme.palette.mode === "dark"
        ? `inset 0 0 15px 1px rgba(117, 115, 197, 0.8), 0 0 15px 1px rgba(117, 115, 197, 0.8)`
        : "none",
  },

  // Disabled State
  "&.Mui-disabled": {
    background:
      variant === "contained"
        ? theme.palette.mode === "dark" ? colors.darkDisabledButton: theme.palette.grey[300] // Dimmed background for contained buttons
        : "transparent", // Transparent for other variants
    color: theme.palette.grey[500], // Dimmed text color
    border:
      variant === "outlined" ? `2px solid ${theme.palette.grey[400]}` : "none", // Dimmed border for outlined buttons
    boxShadow: "none", // Disable glow effect when disabled
  },
}));

const CustomButton: React.FC<CustomButtonProps> = ({
  children,

  variant = "contained",
  size = "medium",
  rounded = true,
  glow = true,
  uppercase = true,
  className = "",
  loading = false,
  loadingText = "",
  disabled = false,
  ...rest
}) => {
  const isMobile = useMediaQuery(600);
  return (
    <div
      className={`relative inline-flex group ${rest.fullWidth ? "w-full" : ""}`}
    >
      {/* Gradient Glow - controlled by the glow prop */}
      {glow &&
        !disabled &&
        variant !== "outlined" && ( // Don't render the glow for outlined variant
          <div className="">
            <div
              className={clsx(
                `absolute transition-all duration-500 hover:opacity-70 opacity-0 inset-[10px] bg-gradient-to-r from-[#b2adff] via-[#8984f9] to-[#6c67cc] blur-md ${
                  rounded ? "rounded-full" : "rounded-none"
                }`,
                size === "small" && "inset-[5px]", // Smaller glow for small buttons
                size === "large" && "inset-[15px]", // Larger glow for large buttons
                "group-hover:opacity-80 group-hover:inset-[4px] group-hover:duration-200"
              )}
            ></div>
          </div>
        )}

      <StyledButton
        disableRipple={!isMobile}
        glow={glow} // Pass glow prop to StyledButton
        variant={variant}
        size={size}
        loading={loading}
        disabled={loading || disabled}
        className={clsx(
          {
            "rounded-full": rounded,
            "rounded-none": !rounded,
            uppercase: uppercase,
          },
          className
        )}
        {...rest}
      >
        {loading ? (
          <Grid
            container
            className={clsx(
              "justify-center items-center text-center flex flex-row",
              className // Ensure the loading state inherits the className prop
            )}
          >
            <Loader />
            <Typography
              className={clsx(
                {
                  "text-[rgb(0,0,0,0.5)]": variant === "outlined",
                  "text-[rgb(255,255,255,0.5)]": variant !== "outlined",
                },
                "dark:text-dark-text px-[1rem] py-[0.4rem]",
                className // Apply the same className here too if necessary
              )}
            >
              {loadingText ?? "Loading..."}
            </Typography>
          </Grid>
        ) : (
          children
        )}
      </StyledButton>
    </div>
  );
};

export default CustomButton;
