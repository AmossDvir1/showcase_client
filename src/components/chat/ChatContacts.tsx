import React from "react";
import MiniProfilePicture from "../sharedComponents/profilePicture/MiniProfilePicture";
import { Typography } from "@mui/material";
import { useWebSocket } from "../../context/WebSocketContext";

interface ChatContactsProps {
  contactsList: UserDetails[];
}

const ChatContacts: React.FC<ChatContactsProps> = ({ contactsList }) => {
  const { onlineFriends } = useWebSocket();

  return (
    <div>
      {onlineFriends.map((contact) => (
        <div className="flex flex-row items-center justify-start m-1 py-1">
          <div className="pr-1"><MiniProfilePicture size="small" userDetails={contact} active></MiniProfilePicture></div>
          <div className="pl-1"><Typography className="text-sm">{`${contact.firstName} ${contact.lastName}`}</Typography></div>
        </div>
      ))}

{/* {onlineFriends?.map(fr => <div>{fr.id}</div>)} */}
    </div>
  );
};

export default ChatContacts;
