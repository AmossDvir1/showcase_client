import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";

import { MenuBar } from "./components/MenuBar/MenuBar";
import { HomePage } from "./components/HomePage";
import { Box } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["pop"].join(","),
  },
});

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
          <MenuBar
            menuItems={["Projects", "Support", "About Us"]}
            userSettings={["Profile", "Settings"]}
          ></MenuBar>
          <Box className="xs:mx-[3rem] sm:mx-[5rem] md:mx-[10rem] lg:mx-[18rem] my-[2.5rem]">
            <HomePage></HomePage>
          </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
