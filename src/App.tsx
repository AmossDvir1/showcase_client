import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";
import { HomePage } from "./pages/HomePage";
import { SignUp } from "./pages/auth/SignUp";
import { Login } from "./pages/auth/Login";
import { UserProjectsDashboard } from "./pages/UserProjectsDashboard";
import { AuthProvider } from "./controllers/auth/useAuth";
import ProtectedRoute from "./pages/ProtectedRoute";
import Layout from "./components/Layout";
import ActivationLayout from "./pages/auth/ActivationLayout";
import Profile from "./pages/profile/ProfilePage";
import { useEffect } from "react";
import io from "socket.io-client";
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
    MuiTypography: {
      styleOverrides: {
        root: {lineHeight: "1.3"}
      }
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
  // useEffect(() => {
  //   const socket = io("ws://localhost:3200/");
  //   return () => {
  //     socket.close();
  //   };
  // }, []);
  



  return (
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route element={<Layout />}>
                {/* <Route
                  element={
                    <ProtectedRoute checkActivation={false}></ProtectedRoute>
                  }
                ></Route> */}
                <Route index element={<HomePage></HomePage>} />
                <Route path="sign_up" element={<SignUp></SignUp>} />
                <Route path="login" element={<Login></Login>} />
                <Route element={<ProtectedRoute></ProtectedRoute>}>
                  <Route
                    path="my-projects"
                    element={<UserProjectsDashboard></UserProjectsDashboard>}
                  ></Route>
                  <Route path="/:type/:urlName" element={<Profile />} />
                </Route>
              </Route>
              <Route element={<Layout withMenu={false} />}>
                <Route
                  path="user-activation"
                  element={<ActivationLayout />}
                ></Route>
              </Route>
              {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            </Routes>
          </Router>
          <ToastContainer />
        </ThemeProvider>
      </AuthProvider>
    </StyledEngineProvider>
  );
};

export default App;
