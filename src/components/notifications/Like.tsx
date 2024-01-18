import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";
import { confirmFriendship } from "../../controllers/friendsController/confirmFriendship";
import {
  fetchNotifications,
  markAsRead,
  markAsUnread,
} from "../../redux/slices/notifications";
import { useAppDispatch } from "../../redux/hooks";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Button as MuiButton } from "@mui/material/";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Button } from "../sharedComponents/Button";

interface LikeProps {
  notification: INotification;
}

const Like: React.FC<LikeProps> = ({ notification }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNotifications());
  }, []);
  const navigate = useNavigate();
  const onConfirmClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    await confirmFriendship(notification.sender);
  };
  const onDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {};

  const onNotificationClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (notification.type === "friend_request") {
      navigate(`/profile/${notification.extraData}`);
    }
  };

  const onDotClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    if (notification.status === "read") {
      dispatch(markAsUnread([notification._id]));
    } else {
      dispatch(markAsRead([notification._id]));
    }
  };

  return (
    <Accordion className="flex flex-col shadow-none border-none bg-transparent">
      <AccordionSummary
        expandIcon={
          <div onClick={onNotificationClick}>
            <ThumbUpIcon className="w-5 pr-2 fill-slate-400 cursor-pointer"></ThumbUpIcon>
          </div>
        }
        className=" flex flex-row-reverse cursor-default"
        sx={{
          "& .MuiAccordionSummary-content": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(0deg)",
          },
        }}
      >
        <Typography className="cursor-default p-2">
          {notification?.content}
        </Typography>
        <CircleIcon
          onClick={onDotClick}
          className={`hover:fill-primary cursor-pointer ${
            notification.status === "unread" ? "fill-primary" : "fill-slate-200"
          } w-3 pl-4`}
        ></CircleIcon>
      </AccordionSummary>
      <AccordionDetails className="flex items-center justify-center">
        <div className="px-4">
          <Button round onClick={onConfirmClick}>
            Confirm
          </Button>
        </div>
        <div className="px-4">
          <MuiButton className=" border-solid border" onClick={onDeleteClick}>
            Delete
          </MuiButton>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Like;
