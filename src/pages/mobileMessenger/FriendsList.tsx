import React from "react";
import Typography from "../../components/sharedComponents/Typography";
import MiniProfilePicture from "../../components/sharedComponents/profilePicture/MiniProfilePicture";
import LinesSkeleton from "../../components/sharedComponents/LinesSkeleton";
import { formatTime } from "../../utils/utils";
import { Skeleton } from "@mui/material";
import useMediaQuery from "../../components/responsiveness/useMediaQuery";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

interface FriendListProps {
  onFriendClick: (friend: ChatPreview) => void;
  loadingPreviews: boolean;
  conversationsPreviews: ChatPreview[];
  numberOfChats: number;
}

interface FriendListItemProps {
  conv: ChatPreview;
  onFriendClick: (friend: ChatPreview) => void;
}

const SkeletonList: React.FC<{ numberOfChats: number }> = ({
  numberOfChats,
}) => {

  return (
    <div>
      {Array.from({ length: numberOfChats }, (_, index) => (
        <div
          key={index}
          className="flex p-2 hover:bg-hover dark:hover:bg-dark-paper rounded-md items-center cursor-pointer"
        >
          <div className="mr-4">
            <Skeleton
              variant="circular"
              animation="wave"
              width={40}
              height={40}
            />
          </div>
          <div className="flex flex-col w-[50%]">
            <Skeleton variant="text" width="70%" height={20} />
            {/* <div className="flex"> */}
            <LinesSkeleton numOfLines={2} className="w-[100%] h-2" />
            {/* </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

const FriendListItem: React.FC<FriendListItemProps> = 
  ({ conv, onFriendClick }) => {
    const userInfo = useSelector((state: RootState) => state.user.userInfo);

    const Details = () =>
      conv?.lastMessage?.createdAt && conv.lastMessage.content ? (
        <div className="flex">
          <div className="flex flex-row max-w-[100px]">
            <Typography className="text-xs text-ellipsis overflow-hidden whitespace-nowrap">
              {`${conv.lastMessage.sender === userInfo?.id ? "You: ":""}${conv.lastMessage.content}`}
            </Typography>
          </div>
          <Typography className="text-xs px-2">•</Typography>
          <Typography className="text-xs">{`${
            formatTime(conv.lastMessage.createdAt.toString()).relativeTime
          }`}</Typography>
        </div>
      ) : null;

    return (
      <div
        key={conv.chatId}
        className="flex p-2 hover:bg-hover dark:hover:bg-dark-paper rounded-md items-center cursor-pointer"
        onClick={() => onFriendClick(conv)}
      >
        <div className="mr-4">
          <MiniProfilePicture
            userDetails={conv?.friendDetails}
            active={conv.isOnline}
            size={"medium"}
          />
        </div>
        <div className="flex flex-col">
          <Typography>{`${conv.friendDetails?.firstName} ${conv.friendDetails?.lastName}`}</Typography>
          <Details />
        </div>
      </div>
    );
  }


const FriendsList: React.FC<FriendListProps> = ({
  conversationsPreviews,
  loadingPreviews,
  onFriendClick,
  numberOfChats,
}) => {
  const isMobile = useMediaQuery(500)
  return (
    <div className="pt-12 sm:pt-24 sm:w-[50vw] overflow-auto p-4 bg-paper-light sm:rounded-xl dark:bg-dark-paper-light">
      <Typography variant="h5" className="mb-4 dark:text-paper-light">
        Messaging
      </Typography>
      {conversationsPreviews?.length > 0 ? (
        // {false ? (
        conversationsPreviews.map((conv) => (
          <FriendListItem
            key={conv.chatId}
            conv={conv}
            onFriendClick={onFriendClick}
          />
        ))
      ) : numberOfChats > 0 || loadingPreviews ? (
        <SkeletonList numberOfChats={numberOfChats} />
      ) : (
        <Typography>No conversations</Typography>
      )}
    </div>
  );
};

export default FriendsList;
