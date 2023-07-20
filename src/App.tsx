import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import { AuthProvider, useAuth } from "./controllers/auth/useAuth";
import ProtectedRoute from "./pages/ProtectedRoute";
import UserValidation from "./pages/auth/UserActivation";
import ActivationBar from "./components/ActivationBar";
import Layout from "./components/Layout";
import UserAlreadyActivated from "./pages/auth/UserAlreadyActivated";
import ActivationLayout from "./pages/auth/ActivationLayout";

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
            <Routes>
              <Route element={<Layout />}>
                <Route
                  element={
                    <ProtectedRoute checkActivation={false}></ProtectedRoute>
                  }
                ></Route>
                <Route index element={<HomePage></HomePage>} />
                <Route path="sign_up" element={<SignUp></SignUp>} />
                <Route path="login" element={<Login></Login>} />
                <Route element={<ProtectedRoute></ProtectedRoute>}>
                  <Route
                    path="my-projects"
                    element={<UserProjectsDashboard></UserProjectsDashboard>}
                  ></Route>
                </Route>
              </Route>
              <Route element={<Layout withMenu={false} />}>
                <Route
                  path="user-activation"
                  element={<ActivationLayout/>}
                ></Route>
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
          <ToastContainer />
        </ThemeProvider>
      </AuthProvider>
    </StyledEngineProvider>
  );
};

export default App;
