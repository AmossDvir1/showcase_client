import React from "react";
import { Box, IconButton, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatBody from "../../components/chat/ChatBody";
import MiniProfilePicture from "../../components/sharedComponents/profilePicture/MiniProfilePicture";
import Typography from "../../components/sharedComponents/Typography";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";

interface ChatPageProps {
  conv: ChatPreview;
  onBackToFriends: () => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ conv, onBackToFriends }) => {
  const friendName = `${conv?.friendDetails?.firstName} ${conv?.friendDetails?.lastName}`;
  const navigate = useNavigate();

  const onChatNameClick = () => {
    if (conv?.friendDetails?.urlMapping) {
      navigate(`/profile/${conv.friendDetails.urlMapping}`);
    }
  };
  if (!conv) {
    return <></>;
  }
  return (
    <Dialog fullScreen className="h-[100svh]" open={true}>
      <Box className="flex items-center py-4 px-3 dark:bg-dark-paper-light bg-paper">
        <IconButton
          className="text-primary dark:text-paper"
          onClick={onBackToFriends}
        >
          <ArrowBackIcon />
        </IconButton>
        <div className="px-2">
          <MiniProfilePicture
            userDetails={conv.friendDetails}
            active={conv.isOnline}
          ></MiniProfilePicture>
        </div>
        <Typography component={"span"} className="pl-2">
          <Link
            className="dark:text-dark-text text-black font-normal"
            underline="hover"
            component="button"
            onClick={onChatNameClick}
          >
            {friendName}
          </Link>
        </Typography>
      </Box>
      <Box className="flex-1 overflow-auto pb-[env(safe-area-inset-bottom)]">
        <ChatBody friend={conv.friendDetails}></ChatBody>
      </Box>
    </Dialog>
  );
};

export default ChatPage;
