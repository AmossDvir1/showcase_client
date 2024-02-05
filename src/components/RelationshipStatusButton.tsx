import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { serverReq } from "../API/utils/axiosConfig";
import { confirmFriendship } from "../controllers/friendsController/confirmFriendship";

const RequestSent = () => {
  return (
    <div className="flex items-center justify-center p-4 w-32 bg-transparent border-solid border-primary border-[1px] rounded-lg">
      <Typography className="text-black">Request Sent</Typography>
    </div>
  );
};
const PendingApproval: React.FC<{ senderId: string | undefined }> = ({
  senderId,
}) => {
  const onConfirmClick = async () => {
    if (senderId) {
      await confirmFriendship(senderId);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center p-4 w-64 bg-transparent border-solid border-primary border-[1px] rounded-lg">
      <Typography>Wants to be your friend</Typography>
      <div className="flex flex-row">
        <Button onClick={onConfirmClick}>confirm</Button>
        <Button>delete</Button>
      </div>
    </div>
  );
};

interface RelationshipStatusButtonProps {
  relationship: RelationshipState;
  setRelationship: React.Dispatch<
    React.SetStateAction<RelationshipState | undefined>
  >;
  userData: UserProfile | null;
}
const RelationshipStatusButton: React.FC<RelationshipStatusButtonProps> = ({
  relationship,
  setRelationship,
  userData,
}) => {
  const onAddUserClick = async () => {
    try {
      const res = await serverReq.post("/friends", {
        addUsername: userData?.username,
      });
      setRelationship(res.data.relationship);
      console.log(res.data);
    } catch (err: any) {
      console.error("Error sending friend request:", err);
    }
  };

  switch (relationship) {
    case "no_relationship":
      return <Button onClick={onAddUserClick}>+Add friend</Button>;
    case "friends":
      return <Typography className="text-black">You are friends</Typography>;
    case "request_sent":
      return <RequestSent></RequestSent>;
    case "pending_approval":
      return (
        <PendingApproval senderId={userData?.id}></PendingApproval>
      );
  }
  return <div></div>;
};

export default RelationshipStatusButton;
