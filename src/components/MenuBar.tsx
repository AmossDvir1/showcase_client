import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Grid } from "@mui/material";
import { Button as MuiButton } from "@mui/material/";
import { Button } from "./sharedComponents/Button";
import { CreateProjectDialog } from "../pages/createProject/CreateProjectDialog";
import { useNavigate } from "react-router-dom";
import ProtectedComponent from "./sharedComponents/ProtectedComponent";
import { useAuth } from "../controllers/auth/useAuth";
import Search from "./search/Search";
import ResponsiveComponent from "./responsiveness/ResponsiveComponent";
import NotificationIcon from "./notifications/NotificationIcon";
import useMediaQuery from "./responsiveness/useMediaQuery";
import { showToast } from "../utils/toast";
import { logout } from "../controllers/auth/logoutUser";
interface Props {
  menuItems: string[];
  userSettings: string[];
}

export const MenuBar: React.FC<Props> = ({ menuItems, userSettings }) => {
  const auth = useAuth();
  const isMobile = useMediaQuery(500);
  const isTablet = useMediaQuery(600);

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const onClose = (
    event: React.MouseEvent<HTMLButtonElement>,
    reason?: string
  ) => {
    if (reason && reason === "backdropClick") return;
    setCreateDialogOpen(false);
  };
  const onClickOpen = () => {
    setCreateDialogOpen(true);
  };

  const onLogOut = async () => {
    const res = await logout();
    if (res) {
      localStorage.removeItem("auth");
      auth.setIsAuthenticated(false);
      showToast(
        "Successfully logged out",
        "Successfully logged out",
        "success"
      );
    } else {
      showToast(
        "Error during logging out",
        "Error during logging out",
        "error"
      );
    }
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className="static bg-transparent border-solid border-b-[1px] border-t-0 border-r-0 border-l-0 border-[#6e6e6e]">
      <Container className="xl:max-w-full 2xl:max-w-[80%] px-0">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { sm: "block", md: "none" },
              }}
            >
              {menuItems.map((page) => (
                <MenuItem disableRipple key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ResponsiveComponent breakpoint="md">
            <AdbIcon sx={{ display: "flex", mr: 1 }} />
          </ResponsiveComponent>
          <Typography
            className="mr-2 flex flex-nowrap xs:tracking-[0.2em] sm:tracking-[0.2em] lg:tracking-[0.4em] xs:text-sm sm:text-sm lg:text-lg text-white decoration-transparent font-semibold"
            variant="h6"
            noWrap
            component="a"
            href="/"
          >
            {isTablet ? "S".toUpperCase() : "Showcase".toUpperCase()}
          </Typography>
          <Box
            className="flex items-center justify-start"
            // sx={{ flexGrow: 2 }}
          >
            <ResponsiveComponent breakpoint="md">
              {menuItems.map((page) => (
                <MuiButton
                  key={page}
                  onClick={handleCloseNavMenu}
                  disableRipple
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontWeight: "400",
                  }}
                >
                  {page}
                </MuiButton>
              ))}
            </ResponsiveComponent>
            <div className="pl-3 xs:max-sm:pl-0">
              <Search></Search>
            </div>
          </Box>

          <Box sx={{ flexGrow: 0, position: "absolute", right: "0px" }}>
            <ProtectedComponent
              checkActivation={false}
              fallback={
                <Grid container className="flex items-center">
                  <Grid
                    item
                    className="flex text-center justify-center cursor-default"
                  >
                    <MenuItem disableRipple>
                      <MuiButton
                        onClick={() => navigate("/login")}
                        disableRipple
                        sx={{
                          my: 2,
                          color: "white",
                          display: "block",
                          fontWeight: "400",
                        }}
                      >
                        Login
                      </MuiButton>
                    </MenuItem>
                  </Grid>
                  <Grid item>
                    <MenuItem className="cursor-default" disableRipple>
                      <Button
                        round
                        btnsize={isMobile ? "xs" : "sm"}
                        onClick={() => navigate("/sign_up")}
                      >
                        sign up
                      </Button>
                    </MenuItem>
                  </Grid>
                </Grid>
              }
            >
              <Grid container className="flex items-center">
                <ResponsiveComponent breakpoint="md">
                  <Grid
                    item
                    className="flex text-center justify-center cursor-default"
                  >
                    <MenuItem disableRipple disabled={!auth.isActivated}>
                      <Typography
                        onClick={() => navigate("/my-projects")}
                        textAlign="center"
                      >
                        {"MY PROJECTS"}
                      </Typography>
                    </MenuItem>
                  </Grid>
                </ResponsiveComponent>

                {/* <ResponsiveComponent breakpoint="md"> */}
                <Grid item>
                  <MenuItem className="cursor-default px-2" disableRipple>
                    <Button
                      className="outline outline-1 w-0 min-w-0"
                      btnsize="xs"
                      transparent
                      round={isMobile}
                      textclassname="text-xs"
                      onClick={onClickOpen}
                      disabled={!auth.isActivated}
                    >
                      {isMobile ? "+" : "+ Create"}
                    </Button>
                    <CreateProjectDialog
                      open={createDialogOpen}
                      onClose={onClose}
                    ></CreateProjectDialog>
                  </MenuItem>
                </Grid>
                {/* </ResponsiveComponent> */}
                <Grid item>
                  <MenuItem className="cursor-default lg:px-4 xs:px-2" disableRipple>
                    <NotificationIcon></NotificationIcon>
                  </MenuItem>
                </Grid>
                <Grid item>
                  <MenuItem className="cursor-default lg:px-4 xs:px-2" disableRipple>
                    <MuiButton
                    className="pl-0"
                      onClick={onLogOut}
                      disableRipple
                    >
                      <Typography
                        noWrap
                        className="flex text-white decoration-transparent text-sm"
                        // component="a"
                        // href="/"
                      >
                        log out
                      </Typography>
                    </MuiButton>
                  </MenuItem>
                </Grid>
              </Grid>
            </ProtectedComponent>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userSettings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
