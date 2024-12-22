import React, { useEffect, useState } from "react";
import { Box, Slide } from "@mui/material";
import FriendsList from "./FriendsList";
import ChatPage from "./ChatPage";
import { useAppSelector } from "../../redux/hooks";
import useMediaQuery from "../../components/responsiveness/useMediaQuery";
import { useWebSocket } from "../../context/WebSocketContext";
import { getConversationsPreviews } from "../../controllers/chatsController/getConversationsPreviews";

const MobileMessenger: React.FC = () => {
  const isMobile = useMediaQuery(600);
  const isDarkMode = useAppSelector((state) => state.theme.mode) === "dark";
  const { conversationsIds } = useWebSocket();

  const [loadingPreviews, setLoadingPreviews] = useState(false);
  const [activeChat, setActiveChat] = useState<ChatPreview | null>(null);
  const [conversationsPreviews, setConversationsPreviews] = useState<
    ChatPreview[]
  >([]);

  useEffect(() => {
    const fetchConvsDetails = async () => {
      setLoadingPreviews(true);
      // Fetch the latest conversation previews
      const previews = await getConversationsPreviews();
      setConversationsPreviews(previews);
      setLoadingPreviews(false);
    };
  
    fetchConvsDetails();
  }, [conversationsIds, activeChat]);

  const handleFriendClick = (chat: ChatPreview) => {
    setActiveChat(chat);
  };

  const handleBackToFriends = () => {
    setActiveChat(null);
  };

  if (!isMobile) return <></>;

  return (
    <Box
      className={`w-full overflow-x-hidden pt-4  ${
        isDarkMode ? "dark:bg-dark-paper-light" : "bg-white"
      }`}
    >
      <Slide
        direction={activeChat ? "right" : "right"}
        in={!activeChat}
        mountOnEnter
        unmountOnExit
      >
        <Box className="w-full absolute">
          <FriendsList
            numberOfChats={conversationsIds.length}
            onFriendClick={handleFriendClick}
            loadingPreviews={loadingPreviews} // Show skeletons only during initial loading
            conversationsPreviews={conversationsPreviews}
          />
        </Box>
      </Slide>
      <Slide
        direction={"left"}
        in={!!activeChat}
        mountOnEnter
        unmountOnExit
      >
        <Box className="w-full">
          {activeChat && (
            <ChatPage conv={activeChat} onBackToFriends={handleBackToFriends} />
          )}
        </Box>
      </Slide>
    </Box>
  );
};


export default MobileMessenger;
