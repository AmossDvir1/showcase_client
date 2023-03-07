import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";

import { Button } from "./components/Button";
import { MenuBar } from "./components/MenuBar/MenuBar";
import { HomePage } from "./components/HomePage";

const theme = createTheme({
  typography: {
    fontFamily: ["pop"].join(","),
  },
});

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="bg-main-bg w-screen h-screen">
          <MenuBar
            menuItems={["Projects", "Support", "About Us"]}
            userSettings={["Profile", "Settings"]}
          ></MenuBar>
          <HomePage></HomePage>
          <Button text="get started"></Button>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
