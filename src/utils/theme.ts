import { createTheme } from "@mui/material/styles";

export const colors = {
  primary: "#7573C5",
  secondary: "#c4fcff",
  mainBg: "#f2f4f7",
  lightText: "#ffffff",
  lightPaper: "#ffffff",
  darkPaper: "#1b2937",
  darkPaperLight: "#424e5b",
  darkPaperDark: "#0e1827",
  darkMainBg: "#040a17",
  darkText: "#d0d5db",
  darkTextLight:"#e1e4e8",
  hover: '#e9ecf2',
  darkDisabledButton: "#616b75"
  
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
              default: colors.darkMainBg,
              paper: colors.darkPaper,
            },
            text: {
              primary: colors.darkText,
            },
          }
        : //   Light theme:
          {
            background: {
              default: "#f5f5f5",
              paper: "#f2f6fa",
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
