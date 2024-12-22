import React from "react";
import MiniProfilePicture from "../sharedComponents/profilePicture/MiniProfilePicture";
import Typography from "../sharedComponents/Typography";

import { useWebSocket } from "../../context/WebSocketContext";
import { useDispatch } from "react-redux";
import { addOpenChat } from "../../redux/slices/chats";

const ChatContacts: React.FC = () => {
  const { conversationsIds } = useWebSocket();
  
  const dispatch = useDispatch();

  const onAddChat = (friend: UserDetails) => {
      dispatch(addOpenChat(friend));
  };

  return (
    <div>
      {/* {conversations?.length > 0 && conversations?.map((friend) => (
        <div
          key={friend.friendId}
          className="px-1 hover:bg-indigo-200 rounded-md flex flex-row items-center justify-start m-1 py-1"
          onClick={(e) => onAddChat(friend)}
        >
          <div className="pr-1">
            <MiniProfilePicture
              size="small"
              userDetails={friend}
              active
            ></MiniProfilePicture>
          </div>
          <div className="pl-1">
            <Typography className="cursor-default text-sm">{`${friend.firstName} ${friend.lastName}`}</Typography>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default ChatContacts;
