import React from "react";
import { Button } from "../sharedComponents/Button";
import FriendRequest from "./FriendRequest";
import Like from "./Like";

interface NotificationDetailsProps {
  notification: INotification;
}
const NotificationDetails: React.FC<NotificationDetailsProps> = ({
  notification,
}) => {


  return (
    <div
      className={`max-w-md flex px-6 py-1.5
      ${notification?.status === "unread" && "bg-neutral-100"}`}
    >
      {notification?.type === "friend_request" && (
        <FriendRequest notification={notification}></FriendRequest>
      )}
      {notification?.type === "like" && (
        <Like notification={notification}></Like>
      )}
    </div>
  );
};

export default NotificationDetails;
