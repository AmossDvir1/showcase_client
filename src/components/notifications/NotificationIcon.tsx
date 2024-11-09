import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  fetchNotifications,
  markAsRead,
} from "../../redux/slices/notifications";
import { useAppDispatch } from "../../redux/hooks";
import { useAppSelector } from "../../redux/hooks";
import NotificationsWindow from "./NotificationsWindow";
import { IconButton } from "@mui/material";
const NotificationIcon = () => {
  const dispatch = useAppDispatch();

  const notifications: INotification[] = useAppSelector(
    (state) => state.notifications
  );
  useEffect(() => {
    if (notifications?.length === 0) {
      dispatch(fetchNotifications());
    }
  }, []);

  // NotificationsWindow vars:
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const unreadNotifications = notifications?.filter(
      (notif) => notif?.status === "unread"
    );
    if (unreadNotifications?.length > 0) {
      dispatch(markAsRead(unreadNotifications?.map((notif) => notif._id)));
    }
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  return (
    <Box className="flex text-center">
      <div>
        <Badge
          className="text-white"
          badgeContent={
            notifications?.filter((notif) => notif.status === "unread")
              ?.length || 0
          }
          sx={{
            ".MuiBadge-badge": { fontSize:'10px', backgroundColor: "#d80000", width: '20px', padding: '0px', minWidth: 0, height: '20px'},
          }}
        >
          <IconButton className="p-0" onClick={handleClick}>
            <NotificationsIcon fontSize="medium" color="primary" />
          </IconButton>
          <NotificationsWindow
            open={open}
            setAnchorEl={setAnchorEl}
            anchorEl={anchorEl}
            notificationsData={notifications}
          ></NotificationsWindow>
        </Badge>
      </div>
    </Box>
  );
};
export default NotificationIcon;
