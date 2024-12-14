import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "../sharedComponents/Typography";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import NotificationStatusDot from "./NotificationStatusDot";
interface LikeProps {
  notification: INotification;
}

const Like: React.FC<LikeProps> = ({ notification }) => {
  const navigate = useNavigate();

  const onNotificationClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (notification.type === "friendRequest") {
      navigate(`/profile/${notification.extraData}`);
    }
  };

  return (
    <div className="w-full my-1 cursor-default items-start flex flex-col shadow-none border-none bg-transparent">
      <div className="flex flex-row items-center justify-center">
        <div onClick={onNotificationClick}>
          <ThumbUpIcon className="flex w-5 pr-4 fill-slate-400 cursor-pointer"></ThumbUpIcon>
        </div>
        <Typography className="flex cursor-default pr-4">
          {notification?.content}
        </Typography>
        <div className="absolute right-4">
          <NotificationStatusDot notification={notification} />
        </div>
      </div>
    </div>
  );
};

export default Like;
