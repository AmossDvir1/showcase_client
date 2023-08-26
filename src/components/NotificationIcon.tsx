import React from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
const NotificationIcon = () => {
  const [count, setCount] = React.useState(2);
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  return (
    <Box className="flex text-center ">

      <div>
        <Badge
          className="text-slate-100"
        //   variant="dot"
          invisible={invisible}
          badgeContent={count}
        >
          <NotificationsIcon fontSize="medium" color="primary"/>
        </Badge>
      </div>
    </Box>
  );
};
export default NotificationIcon;
