import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import "react-toastify/dist/ReactToastify.css";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";
import { MenuBar } from "./components/MenuBar";
import { HomePage } from "./pages/HomePage";
import { Box } from "@mui/material";
import { SignUp } from "./pages/auth/SignUp";
import { Login } from "./pages/auth/Login";
import { UserProjectsDashboard } from "./pages/UserProjectsDashboard";
import { AuthProvider } from "./controllers/auth/useAuth";
import ProtectedRoute from "./pages/ProtectedRoute";
import UserValidation from "./pages/auth/UserValidation";

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
  const { notifications, clear, markAllAsRead, markAsRead } =
    useNotificationCenter();


  return (
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <MenuBar
              menuItems={["Projects", "Support", "About Us"]}
              userSettings={["Profile", "Settings"]}
            ></MenuBar>
            <Box className="xs:mx-[3rem] sm:mx-[5rem] md:mx-[7rem] lg:mx-[7rem] 2xl:mx-[17rem] my-[2.5rem]">
              <Routes>
                <Route element={<ProtectedRoute></ProtectedRoute>}>
                  <Route
                    path="validation"
                    element={<UserValidation></UserValidation>}
                  ></Route>
                </Route>
                <Route index element={<HomePage></HomePage>} />
                <Route path="sign_up" element={<SignUp></SignUp>} />
                <Route path="login" element={<Login></Login>} />
                <Route
                  path="my_projects"
                  element={<UserProjectsDashboard></UserProjectsDashboard>}
                />
              </Routes>
            </Box>
          </Router>
          <ToastContainer />
        </ThemeProvider>
      </AuthProvider>
    </StyledEngineProvider>
  );
};

export default App;
