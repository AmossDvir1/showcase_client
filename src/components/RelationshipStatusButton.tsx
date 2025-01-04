import { Button, styled, Theme } from "@mui/material";
import Typography from "./sharedComponents/Typography";
import React, { useState } from "react";
import { serverReq } from "../API/utils/axiosConfig";
import { confirmFriendship } from "../controllers/friendsController/confirmFriendship";
import Loader from "./sharedComponents/Loader";
import CustomButton from "./sharedComponents/CustomButton";
import { Chip } from "./sharedComponents/Chip";

const RequestSent: React.FC = () => {
  return (
    <Chip
      className="bg-paper-dark dark:bg-dark-paper-light"
      label="Request sent"
    ></Chip>
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
    <div className="flex flex-col items-center justify-center  w-fit bg-transparent  rounded-lg">
      <Typography className="text-black lg:text-base xs:text-xs text-center pb-2">
        Wants to be your friend
      </Typography>
      <div className="flex flex-row">
        <div className="flex flex-row">
          {loading ? (
            <Loader></Loader>
          ) : (
            <div className="flex flex-row">
              <CustomButton size="small" className="md:px-3 xl:px-4 px-0 md:mr-2 mr-1 text-[10px] md:text-[14px] md:h-[inherit] h-8" variant="outlined">delete</CustomButton>
              <CustomButton size="small" className="md:px-3 xl:px-4 px-0 md:ml-2 ml-1 text-[10px] md:text-[14px] md:h-[inherit] h-8" onClick={onConfirmClick}>confirm</CustomButton>
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
    } catch (err: any) {
      console.error("Error sending friend request:", err);
    }
  };

  switch (relationship) {
    case "no_relationship":
      return (
        <CustomButton className="" size="small" onClick={onAddUserClick}>
          +Add friend
        </CustomButton>
      );
    case "friends":
      return (
        <Chip
        className="bg-paper-dark dark:bg-dark-paper-light"
        label="You are friends"
      ></Chip>
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
