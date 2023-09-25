import React from "react";
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

interface NotificationDetailsProps {
  notification: INotification;
}
const NotificationDetails: React.FC<NotificationDetailsProps> = ({
  notification,
}) => {
  const navigate = useNavigate();
  const onNotificationClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (notification.type === "friend_request") {
      navigate(`/profile/${notification.extraData}`);
    }
  };
  return (
    <div
      className={`flex p-3 ${
        notification?.status === "unread" ? "bg-slate-100" : ""
      }`}
    >
      {notification?.type === "friend_request" && (
        <Accordion className="flex flex-col shadow-none border-none">
          <AccordionSummary
            expandIcon={
              <IconButton onClick={onNotificationClick}>
                <GroupAddIcon className="w-5 pr-2 fill-slate-400"></GroupAddIcon>
              </IconButton>
            }
            className="bg-transparent flex flex-row-reverse cursor-default"
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
              className={`hover:fill-primary ${
                notification.status === "unread"
                  ? "fill-primary"
                  : "fill-slate-200"
              } w-3 pl-4`}
            ></CircleIcon>
          </AccordionSummary>
          <AccordionDetails className="flex items-center justify-center">
            <div className="px-4">
              <Button round>Confirm</Button>
            </div>
            <div className="px-4">
              <MuiButton className="bg-transparent border-solid border">
                Delete
              </MuiButton>
            </div>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
};

export default NotificationDetails;
