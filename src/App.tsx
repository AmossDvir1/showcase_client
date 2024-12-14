import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider, ThemeOptions } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";
import { HomePage } from "./pages/HomePage";
import { SignUp } from "./pages/auth/SignUp";
import { Login } from "./pages/auth/Login";
import { UserProjectsDashboard } from "./pages/UserProjectsDashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import Layout from "./components/Layout";
import ActivationLayout from "./pages/auth/ActivationLayout";
import Profile from "./pages/profile/ProfilePage";
import { WebSocketProvider } from "./context/WebSocketContext";
import SettingsPage from "./pages/settings/SettingsPage";
import AboutUs from "./pages/AboutUs";
import { useAppSelector } from "./redux/hooks";
import { useEffect } from "react";
import { createMuiTheme } from "./utils/theme";

const rootElement = document.getElementById("root");


const App = () => {

  const themeMode = useAppSelector((state) => state.theme.mode);
  
  const muiTheme = createMuiTheme(themeMode, rootElement);

  useEffect(() => {
    // Add or remove the 'dark' class on the root html element: 
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);
  
  return (
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <ThemeProvider theme={muiTheme}>
          <WebSocketProvider>
            <Router>
              <Routes>
                <Route element={<Layout />}>
                  {/* <Route
                  element={
                    <ProtectedRoute checkActivation={false}></ProtectedRoute>
                  }
                ></Route> */}
                  <Route index element={<HomePage></HomePage>} />
                  <Route path="about" element={<AboutUs />} />
                  <Route path="sign_up" element={<SignUp></SignUp>} />
                  <Route path="login" element={<Login></Login>} />
                  <Route element={<ProtectedRoute></ProtectedRoute>}>
                    <Route
                      path="my-projects"
                      element={<UserProjectsDashboard></UserProjectsDashboard>}
                    ></Route>
                    <Route
                      path="settings"
                      element={<SettingsPage></SettingsPage>}
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
          </WebSocketProvider>
        </ThemeProvider>
      </AuthProvider>
    </StyledEngineProvider>
  );
};

export default App;
