import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { serverReq } from "../API/utils/axiosConfig";
import { confirmFriendship } from "../controllers/friendsController/confirmFriendship";
import Loader from "./sharedComponents/Loader";

const RequestSent: React.FC = () => {
  return (
    <div className="flex items-center justify-center xs:p-[0.37rem] lg:p-3 w-fit bg-transparent border-solid border-primary border-[1px] rounded-lg">
      <Typography className="text-black lg:text-base xs:text-sm text-center">
        Request Sent
      </Typography>
    </div>
  );
};
interface PendingApprovalProps {
  senderId: string | undefined;
  setRelationship: React.Dispatch<
    React.SetStateAction<RelationshipState | undefined>
  >;
}
const PendingApproval: React.FC<PendingApprovalProps> = ({
  senderId,
  setRelationship,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const onConfirmClick = async () => {
    if (senderId) {
      try {
        setLoading(true);
        const res = await confirmFriendship(senderId);
        setRelationship(res.relationship);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center xs:p-[0.37rem] lg:p-3 w-fit bg-transparent border-solid border-primary border-[1px] rounded-lg">
      <Typography className="text-black lg:text-base xs:text-xs text-center">
        Wants to be your friend
      </Typography>
      <div className="flex flex-row">
        <div className="flex flex-row">
          {loading ? (
            <Loader></Loader>
          ) : (
            <div className="flex flex-row">
              <Button onClick={onConfirmClick}>confirm</Button>
              <Button>delete</Button>
            </div>
          )}
        </div>
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
      return (
        <div className="flex flex-col items-center justify-center xs:p-[0.37rem] lg:p-3 w-fit bg-transparent border-solid border-primary border-[1px] rounded-lg">
        <Typography className="text-black lg:text-base xs:text-xs text-center">
          You are friends
        </Typography></div>
      );
    case "request_sent":
      return <RequestSent></RequestSent>;
    case "pending_approval":
      return (
        <PendingApproval
          setRelationship={setRelationship}
          senderId={userData?.id}
        ></PendingApproval>
      );
  }
  return <div></div>;
};

export default RelationshipStatusButton;
