import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider, ThemeOptions } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";
import { HomePage } from "./pages/HomePage";
import { SignUp } from "./pages/auth/SignUp";
import { Login } from "./pages/auth/Login";
import { UserProjectsDashboard } from "./pages/UserProjectsDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
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
import MobileMessenger from "./pages/mobileMessenger/MobileMessenger";
import Room from "./pages/room/Room";
import { fetchAiAssistantStatus } from "./redux/slices/aiAssistantSlice";
import { useDispatch } from "react-redux";

const rootElement = document.getElementById("root");


const App = () => {
  const dispatch = useDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const {checkFinished, isAuthenticated, isActivated} = useAuth();
  const muiTheme = createMuiTheme(themeMode, rootElement);

  useEffect(() => {
    // Add or remove the 'dark' class on the root html element: 
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  useEffect(() => {
    if (checkFinished && isAuthenticated && isActivated) {
      dispatch(fetchAiAssistantStatus());
    }
  }, [dispatch, isAuthenticated, checkFinished, isActivated]);
  
  return (
    <StyledEngineProvider injectFirst>
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
                    <Route
                      path="messenger"
                      element={<MobileMessenger></MobileMessenger>}
                    ></Route>
                    <Route path="/:type/:urlName" element={<Profile />} />
                    <Route path="/room/:id" element={<Room />} />
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
    </StyledEngineProvider>
  );
};

export default App;
