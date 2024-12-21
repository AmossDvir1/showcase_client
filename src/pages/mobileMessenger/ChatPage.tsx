import React from "react";
import { Box, IconButton, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatBody from "../../components/chat/ChatBody";
import MiniProfilePicture from "../../components/sharedComponents/profilePicture/MiniProfilePicture";
import Typography from "../../components/sharedComponents/Typography";
import { useWebSocket } from "../../context/WebSocketContext";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";

interface ChatPageProps {
  friend: UserDetails;
  onBackToFriends: () => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ friend, onBackToFriends }) => {
  const friendName = `${friend.firstName} ${friend.lastName}`;
  const { onlineFriends } = useWebSocket();
  const navigate = useNavigate();

  const onChatNameClick = () => {
    navigate(`/profile/${friend.urlMapping}`);
  };

  return (
    <Dialog fullScreen className="h-[100vh]" open={true}>
        <Box className="flex items-center py-4 px-3 dark:bg-dark-paper-light bg-paper">
          <IconButton
            className="text-primary dark:text-paper"
            onClick={onBackToFriends}
          >
            <ArrowBackIcon />
          </IconButton>
          <div className="px-2">
            <MiniProfilePicture
              userDetails={friend}
              active={onlineFriends.some((item) => item.id === friend.id)}
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
        <Box className="flex-1 overflow-auto ">
          <ChatBody friend={friend} fullWidth fullHeight></ChatBody>
        </Box>
    </Dialog>
  );
};

export default ChatPage;
