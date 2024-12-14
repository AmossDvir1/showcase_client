import { createTheme } from "@mui/material/styles";

export const colors = {
  primary: "#7573C5",
  secondary: "#c4fcff",
  mainBg: "#f2f4f7",
  darkMainBg: "#0D0D12",
  lightText: "#ffffff",
  darkText: "#000000",
};

export const createMuiTheme = (
  mode: "light" | "dark",
  rootElement: HTMLElement | null
) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#7573C5', // Your custom primary color
      },
      ...(mode === "dark"
        ? {
            background: {
              default: "#040a17",
              paper: "#1e263c",
              
            },
            text: {
              primary: "#7573C5",
            },
          }
        : //   Light theme:
          {
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
            text: {
              primary: "#7573C5",
            },
          }),
    },
    typography: {
      fontFamily: ["pop"].join(","),
    },
    components: {
      MuiPopover: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: { lineHeight: "1.3" },
        },
      },
      MuiPopper: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiDialog: {
        defaultProps: {
          container: rootElement,
        },
      },
    },
  });
