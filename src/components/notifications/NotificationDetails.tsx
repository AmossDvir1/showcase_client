import React from "react";
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
      ${notification?.status === "unread" && "bg-paper dark:bg-dark-paper"}`}
    >
      {notification?.type === "friendRequest" && (
        <FriendRequest notification={notification}></FriendRequest>
      )}
      {(notification?.type === "likeComment" || notification?.type === "likePost" || notification?.type === "comment") && (
        <Like notification={notification}></Like>
      )}
    </div>
  );
};

export default NotificationDetails;
