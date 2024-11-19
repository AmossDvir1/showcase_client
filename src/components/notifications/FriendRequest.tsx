import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { confirmFriendship } from "../../controllers/friendsController/confirmFriendship";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Button as MuiButton } from "@mui/material/";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Button } from "../sharedComponents/Button";
import NotificationStatusDot from "./NotificationStatusDot";

interface FriendRequestProps {
  notification: INotification;
}

const FriendRequest: React.FC<FriendRequestProps> = ({ notification }) => {
  const navigate = useNavigate();
  const onConfirmClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      const res = await confirmFriendship(notification.sender);
    } catch (err: any) {
      console.error(err);
    }
  };
  const onDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {};

  const onNotificationClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (notification.type === "friendRequest") {
      navigate(`/profile/${notification.extraData}`);
    }
  };

  return (
    <div className="w-full my-1 items-start flex flex-col shadow-none border-none bg-transparent">
    <Accordion className="w-full  items-center flex flex-col shadow-none border-none bg-transparent px-0 py-0" sx={{
      "&.MuiAccordion-root.Mui-expanded": { margin: 0 }
    }}>
      <AccordionSummary

        className="w-full min-h-0 px-0 flex-row-reverse  flex items-center justify-center"
        sx={{
          "& .MuiAccordionSummary-content": { margin: 0, width:'100%', display: 'flex', alignItems: 'center' },
          "& .MuiAccordionSummary-content.Mui-expanded": {margin: 0}

        }}
      >
        <div className="flex items-center" onClick={onNotificationClick}>
            <GroupAddIcon className="pr-4 w-5 fill-slate-400 cursor-pointer"></GroupAddIcon>
          </div>
        <Typography className=" pr-4">
          {notification?.content}
        </Typography>

      </AccordionSummary>
      <AccordionDetails className="p-0 pt-2.5 flex items-center justify-center">
        <Button className="mr-4" round onClick={onConfirmClick}>
          Confirm
        </Button>
        <MuiButton className="border-solid border" onClick={onDeleteClick}>
          Delete
        </MuiButton>
      </AccordionDetails>
    </Accordion>
    <div className="absolute right-4">
          <NotificationStatusDot notification={notification} />
        </div>
    </div>
  );
};

export default FriendRequest;
