import React from 'react'
import CircleIcon from "@mui/icons-material/Circle";
import { useAppDispatch } from "../../redux/hooks";
import {
    markAsRead,
    markAsUnread,
  } from "../../redux/slices/notifications";
import { useDispatch } from 'react-redux';

const NotificationStatusDot: React.FC<{notification: INotification}>= ({notification}) => {
    const dispatch = useDispatch();

    const onDotClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        if (notification.status === "read") {
          dispatch(markAsUnread([notification._id]));
        } else {
          dispatch(markAsRead([notification._id]));
        }
      };


  return (
    <CircleIcon
    onClick={onDotClick}
    className={`justify-end flex items-center hover:fill-primary cursor-pointer ${
      notification.status === "unread" ? "fill-primary" : "fill-slate-200"
    } w-3`}
  ></CircleIcon>
  )
}
export default NotificationStatusDot
