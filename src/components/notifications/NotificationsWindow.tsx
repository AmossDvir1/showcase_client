import React from "react";
import Popover, { PopoverProps } from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import NotificationDetails from "./NotificationDetails";
import { Collapse } from "@mui/material";
interface NotificationsWindowProps extends PopoverProps {
  notificationsData: INotification[];
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

const NotificationsWindow: React.FC<NotificationsWindowProps> = ({
  notificationsData,
  anchorEl,
  setAnchorEl,
}) => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: -150,
        }}
      >
        {notificationsData?.map((notif, index) => (
          <div key={index}>
            {index > 0 && (
              <div
                className={`${
                  notif.status === "unread" && "bg-neutral-100"
                } flex items-center justify-center`}
              >
                <Divider className="w-[92%] bg-slate-100"></Divider>
              </div>
            )}
            <NotificationDetails
              notification={notif}
              key={index}
            ></NotificationDetails>
          </div>
        ))}
      </Popover>
    </div>
  );
};

export default NotificationsWindow;
