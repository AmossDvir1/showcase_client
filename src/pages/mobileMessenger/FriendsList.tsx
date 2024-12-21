import React, { useEffect, useState } from "react";
import Typography from "../../components/sharedComponents/Typography";
import { useWebSocket } from "../../context/WebSocketContext";
import MiniProfilePicture from "../../components/sharedComponents/profilePicture/MiniProfilePicture";
import { serverReq } from "../../API/utils/axiosConfig";
import LinesSkeleton from "../../components/sharedComponents/LinesSkeleton";
import { formatTime } from "../../utils/utils";

interface FriendListProps {
  onFriendClick: (friend: UserDetails) => void;
}

const Details: React.FC<{ friend: UserDetails; previews: ChatPreview[] }> = ({
  friend,
  previews,
}) => {
  const lastMessageData = previews.find((prev) => prev.friendId === friend.id);

  return lastMessageData &&
    lastMessageData.lastMessageContent &&
    lastMessageData.lastMessageAt ? (
    <div className="flex">
      <div className="flex flex-row max-w-[100px]">
        <Typography className="text-xs text-ellipsis overflow-hidden whitespace-nowrap">
          {lastMessageData?.lastMessageContent}
        </Typography>
      </div>
      <Typography className="text-xs px-2">•</Typography>
      <Typography className="text-xs">{`${
        formatTime(lastMessageData?.lastMessageAt).relativeTime
      }`}</Typography>
    </div>
  ) : (
    <></>
  );
};

const FriendsList: React.FC<FriendListProps> = ({ onFriendClick }) => {
  const { onlineFriends } = useWebSocket();
  const [previews, setPreviews] = useState<ChatPreview[]>([]);
  const [loadingPreviews, setLoadingPreviews] = useState(false);
  useEffect(() => {
    const fetchChatPreviews = async () => {
      setLoadingPreviews(true);
      try {
        const res = await serverReq.get("chats/previews");
        console.log(res.data.lastMessages);
        // Ensure the data is assigned properly
        if (res?.data?.lastMessages) {
          setPreviews(res.data.lastMessages as ChatPreview[]); // Ensure proper typing here
        }
        setLoadingPreviews(false);
        return res;
      } catch (err: any) {
        console.error(err);
        setLoadingPreviews(false);
      }
    };
    fetchChatPreviews();
  }, [onlineFriends]);

  const arr = [];
  for (let index = 0; index < 40; index++) {
    onlineFriends?.[0] && arr.push(onlineFriends?.[0]);
  }
  return (
    <div className="overflow-auto p-4 bg-main-bg dark:bg-dark-paper-light">
      <Typography variant="h5" className="mb-4 dark:text-paper-light">
        Online Friends
      </Typography>
      {onlineFriends?.length > 0 ? (
        onlineFriends.map((friend) => (
          <div
            key={friend?.id}
            className="flex p-2 hover:bg-hover dark:hover:bg-dark-paper rounded-md items-center cursor-pointer"
            onClick={() => onFriendClick(friend)}
          >
            <div className="mr-4">
              <MiniProfilePicture userDetails={friend} active size={"medium"} />
            </div>
            <div className="flex flex-col ">
              <Typography>{`${friend?.firstName} ${friend?.lastName}`}</Typography>
              {loadingPreviews ? (
                <LinesSkeleton numOfLines={2} className="w-[100%] h-2" />
              ) : (
                <Details previews={previews} friend={friend}></Details>
              )}
            </div>
          </div>
        ))
      ) : (
        <Typography>No friends online</Typography>
      )}
    </div>
  );
};

export default FriendsList;
