import React, { useEffect } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Typography from "@mui/material/Typography";
import { Button as MuiButton } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
} from "@mui/material";
import { Button } from "../sharedComponents/Button";
import { useAppDispatch } from "../../redux/hooks";
import { fetchNotifications } from "../../redux/slices/notifications";
import FriendRequest from "./FriendRequest";
import Like from "./Like";

interface NotificationDetailsProps {
  notification: INotification;
}
const NotificationDetails: React.FC<NotificationDetailsProps> = ({
  notification,
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNotifications());
  }, []);

  return (
    <div
      className={`flex px-3 py-1
      ${notification?.status === "unread" && "bg-neutral-100"}`}
    >
      {notification?.type === "friend_request" && (
        <FriendRequest notification={notification}></FriendRequest>
      )}
      {notification?.type === "like" && (
        <Like notification={notification}></Like>
        // <div></div>
      )}
    </div>
  );
};

export default NotificationDetails;
