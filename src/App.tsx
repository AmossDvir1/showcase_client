import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";
import { MenuBar } from "./components/MenuBar";
import { HomePage } from "./pages/HomePage";
import { Box } from "@mui/material";
import { SignUp } from "./pages/auth/SignUp";
import { Login } from "./pages/auth/Login";
import { Upload } from "./pages/Upload";
import { UserProjectsDashboard } from "./pages/UserProjectsDashboard";

const rootElement = document.getElementById("root");

const theme = createTheme({
  palette: {
    primary: {
      main: "#7573C5",
    },
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

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <MenuBar
            menuItems={["Projects", "Support", "About Us"]}
            userSettings={["Profile", "Settings"]}
          ></MenuBar>
          <Box className="xs:mx-[3rem] sm:mx-[5rem] md:mx-[7rem] lg:mx-[7rem] 2xl:mx-[17rem] my-[2.5rem]">
            <Routes>
              <Route index element={<HomePage></HomePage>} />
              <Route path="sign_up" element={<SignUp></SignUp>} />
              <Route path="login" element={<Login></Login>} />
              <Route path="upload" element={<Upload></Upload>} />
              <Route
                path="my_projects"
                element={<UserProjectsDashboard></UserProjectsDashboard>}
              />
            </Routes>
          </Box>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
