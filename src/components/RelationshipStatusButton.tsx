import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { serverReq } from "../API/utils/axiosConfig";

const RequestSent = () => {
  return (
    <div className="flex items-center justify-center p-4 w-64 bg-transparent border-solid border-primary border-[1px] rounded-lg">
      <Typography>Request Sent</Typography>
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
      return <Typography>You are friends</Typography>;
    case "request_sent":
      return <RequestSent></RequestSent>;
  }
  return <div></div>
};

export default RelationshipStatusButton;
