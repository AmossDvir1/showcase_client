import React from "react";
import Popover, { PopoverProps } from "@mui/material/Popover";
import { Divider } from "@mui/material";

import NotificationDetails from "./NotificationDetails";
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
        className="h-1/2"
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {[...notificationsData]?.reverse()?.map((notif, index) => (
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
