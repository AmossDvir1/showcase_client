import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";
import {
  fetchNotifications,
  markAsRead,
  markAsUnread,
} from "../../redux/slices/notifications";
import { useAppDispatch } from "../../redux/hooks";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
interface LikeProps {
  notification: INotification;
}

const Like: React.FC<LikeProps> = ({ notification }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNotifications());
  }, []);
  const navigate = useNavigate();

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
        expandIcon={<ExpandMoreIcon className="pt-1"></ExpandMoreIcon>}
        className="flex flex-col cursor-default items-center justify-end"
        sx={{
          
          "& .MuiAccordionSummary-content": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            margin:"0",
            marginTop:2
          },
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(180deg)",
          },
          "& .MuiAccordionSummary-expandIconWrapper": {
            display: "none",
            alignItems: "center",
            justifyContent: "center"
          },
          "&:hover .MuiAccordionSummary-expandIconWrapper": {
            display: "flex", // Show the expand icon on hover
          },
        }}
      >
        <div className="flex flex-row">
          <div onClick={onNotificationClick}>
            <ThumbUpIcon className="w-5 pr-2 fill-slate-400 cursor-pointer"></ThumbUpIcon>
          </div>
          <Typography className="cursor-default px-2 pt-2">
            {notification?.content}
          </Typography>
          <CircleIcon
            onClick={onDotClick}
            className={`hover:fill-primary cursor-pointer ${
              notification.status === "unread"
                ? "fill-primary"
                : "fill-slate-200"
            } w-3 pl-4`}
          ></CircleIcon>
        </div>
      </AccordionSummary>
      <AccordionDetails className="flex items-center justify-center"></AccordionDetails>
    </Accordion>
  );
};

export default Like;
