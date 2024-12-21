import React from "react";
import Typography from "../../components/sharedComponents/Typography";
import { useWebSocket } from "../../context/WebSocketContext";
import MiniProfilePicture from "../../components/sharedComponents/profilePicture/MiniProfilePicture";

interface FriendListProps {
  onFriendClick: (friend: UserDetails) => void;
}

const FriendsList: React.FC<FriendListProps> = ({ onFriendClick }) => {
    const {onlineFriends} = useWebSocket();

  return (
    <div className="overflow-auto p-4 dark:bg-dark-paper-light">
      <Typography variant="h5" className="mb-4">
        Online Friends
      </Typography>
      {onlineFriends?.length > 0 ? (
        onlineFriends.map((friend) => (
          <div
            key={friend.id}
            className="flex p-2 hover:bg-gray-100 dark:hover:bg-dark-paper rounded-md items-center cursor-pointer"
            onClick={() => onFriendClick(friend)}
          >
              <div className="mr-4">
            <MiniProfilePicture
                userDetails={friend}
              active
                size={"small"}
            />
              </div>
            <Typography>{`${friend.firstName} ${friend.lastName}`}</Typography>
          </div>
        ))
      ) : (
        <Typography>No friends online</Typography>
      )}
    </div>
  );
};

export default FriendsList;