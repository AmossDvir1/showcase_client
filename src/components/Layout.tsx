import React from "react";
import { Box } from "@mui/material";
import { MenuBar } from "./MenuBar";
import { RouteProps, Outlet } from "react-router-dom";
import ActivationBar from "./ActivationBar";

interface LayoutProps {
  withMenu?: boolean;
}

const Layout: React.FC<RouteProps & LayoutProps> = ({ withMenu = true }) => {
  return (
    <>
      {withMenu && (
        <>
          <ActivationBar></ActivationBar>
          <MenuBar
            menuItems={["Projects", "Support", "About Us"]}
            userSettings={["Profile", "Settings"]}
          />
        </>
      )}
      <Box className="xs:mx-[2rem] sm:mx-[2rem] md:mx-[2rem] lg:mx-[2rem] 2xl:mx-[17rem] my-[2.5rem]">
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
