import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "./sharedComponents/Typography";
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
import Search from "./search/Search";
import ResponsiveComponent from "./responsiveness/ResponsiveComponent";
import NotificationIcon from "./notifications/NotificationIcon";
import useMediaQuery from "./responsiveness/useMediaQuery";
import MiniProfilePicture from "./sharedComponents/profilePicture/MiniProfilePicture";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/rootReducer";
import ChatDrawer from "./chat/ChatDrawer";
import SwipeableMobileDrawer from "./sharedComponents/SwipeableMobileDrawer";
import LogoutIcon from "@mui/icons-material/Logout";

interface Props {
  userSettings: string[];
}

export const MenuBar: React.FC<Props> = ({ userSettings }) => {
  const auth = useAuth();
  const isMobile = useMediaQuery(600);
  const isTablet = useMediaQuery(600);
  const userInfo = useAppSelector((state: RootState) => state.user.userInfo);
  const navigate = useNavigate();
  const [mobileUserDrawerOpen, setMobileUserDrawerOpen] = useState(false);

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

  const toggleDrawer = () => {
    setMobileUserDrawerOpen((prev) => !prev);
  };

  const onLogOut = async () => {
    auth.logout();
  };

  const onAboutUsClick = () => {
    handleCloseNavMenu();
    navigate("/about");
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const onOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    setMobileUserDrawerOpen(true);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const onProfileClick = () => {
    setAnchorElUser(null);
    setMobileUserDrawerOpen(false);
    navigate(`/profile/${userInfo?.urlMapping}`);
  };

  const onSettingsClick = () => {
    setAnchorElUser(null);
    setMobileUserDrawerOpen(false);
    navigate("/settings");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setMobileUserDrawerOpen(false);
  };

  return (
    <AppBar className="bg-main-bg dark:bg-dark-main-bg border-solid border-b-[1px] border-t-0 border-r-0 border-l-0 border-[#6e6e6e] fixed top-0 left-0 right-0 z-index: 100">
      <Container className="xl:max-w-full 2xl:max-w-[80%] px-0 xs:max-w-[] xs:px-4">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              className="p-0 pr-1"
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
              <MenuItem disableRipple onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{"Projects"}</Typography>
              </MenuItem>
              <MenuItem disableRipple onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{"Support"}</Typography>
              </MenuItem>
              <MenuItem disableRipple onClick={onAboutUsClick}>
                <Typography textAlign="center">{"About Us"}</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            className="mr-2 flex flex-nowrap xs:tracking-[0.2em] sm:tracking-[0.2em] lg:tracking-[0.4em] xs:text-sm sm:text-sm lg:text-lg text-white decoration-transparent font-semibold"
            variant="h6"
            noWrap
            component="a"
          >
            <Link
              className="flex"
              underline="none"
              component="button"
              onClick={() => navigate("/")}
            >
              <AdbIcon className="flex  mr-1" />
              {isTablet ? "" : "Showcase".toUpperCase()}
            </Link>
          </Typography>
          <Box
            className="flex items-center justify-start"
            // sx={{ flexGrow: 2 }}
          >
            <ResponsiveComponent breakpoint="md">
              {/* {menuItems.map((page) => (
                <MuiButton
                  key={page}
                  onClick={handleCloseNavMenu}
                  disableRipple
                  sx={{
                    my: 1,
                    color: "white",
                    display: "block",
                    fontWeight: "400",
                  }}
                >
                  {page}
                </MuiButton>
              ))} */}
              <MuiButton
                className="my-1 text-white block font-normal"
                disableRipple
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">{"Projects"}</Typography>
              </MuiButton>
              <MuiButton
                className="my-1 text-white block font-normal"
                disableRipple
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">{"Support"}</Typography>
              </MuiButton>
              <MuiButton
                className="my-1 text-white block font-normal"
                disableRipple
                onClick={onAboutUsClick}
              >
                <Typography textAlign="center">{"About Us"}</Typography>
              </MuiButton>
            </ResponsiveComponent>
            <div className="pl-3 xs:max-sm:pl-0 xs:max-sm:w-full">
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

                {/* Messaging */}
                {isMobile && (
                  <Grid item>
                    <MenuItem
                      className="cursor-default lg:px-4 xs:pl-2 xs:pr-0"
                      disableRipple
                    >
                      <ChatDrawer onMenuBar></ChatDrawer>
                    </MenuItem>
                  </Grid>
                )}
                {/* </ResponsiveComponent> */}
                <Grid item>
                  <MenuItem
                    className="cursor-default lg:px-4 xs:pl-2 xs:pr-0"
                    disableRipple
                  >
                    <NotificationIcon></NotificationIcon>
                  </MenuItem>
                </Grid>
                {userInfo && (
                  <Grid item>
                    <MenuItem
                      className="cursor-default lg:px-4 xs:ml-0 xs:pr-0"
                      onClick={onOpenNavMenu}
                      disableRipple
                    >
                      <MiniProfilePicture
                        size="medium"
                        media={[userInfo.profilePicture]}
                        userDetails={userInfo}
                      ></MiniProfilePicture>
                    </MenuItem>
                  </Grid>
                )}
              </Grid>
            </ProtectedComponent>
            {isMobile ? (
              <SwipeableMobileDrawer
                open={mobileUserDrawerOpen}
                toggleDrawer={toggleDrawer}
                buttons={[
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={onProfileClick}
                    sx={{
                      width: "80%",
                      height: "3rem",
                      fontSize: "1rem",
                    }}
                  >
                    Profile
                  </Button>,
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={onSettingsClick}
                    sx={{ width: "80%", height: "3rem", fontSize: "1rem" }}
                  >
                    Settings
                  </Button>,
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      onLogOut();
                      setAnchorElUser(null);
                      setMobileUserDrawerOpen(false);
                    }}
                    sx={{ width: "80%", height: "3rem", fontSize: "1rem" }}
                    startIcon={<LogoutIcon />}
                  >
                    Log Out
                  </Button>,
                ]}
              ></SwipeableMobileDrawer>
            ) : (
              <Menu
                disableScrollLock
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
                <MenuItem onClick={onProfileClick}>
                  <Typography textAlign="center">{"Profile"}</Typography>
                </MenuItem>
                <MenuItem onClick={onSettingsClick}>
                  <Typography textAlign="center">{"Settings"}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onLogOut();
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">{"Log Out"}</Typography>
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
