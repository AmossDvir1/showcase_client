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

  const fetchConvsDetails = async () => {
    setLoadingPreviews(true);
    // Fetch the latest conversation previews
    const previews = await getConversationsPreviews();
    const sortedPreviews = sortConversations(previews);
    setConversationsPreviews(sortedPreviews);
    setLoadingPreviews(false);
  };

  const sortConversations = (conversations: ChatPreview[]): ChatPreview[] => {
    return conversations.sort((a, b) => {
      // Online friends come first
      if (a.isOnline && !b.isOnline) return -1;
      if (!a.isOnline && b.isOnline) return 1;
  
      // Sort by last message timestamp (most recent first)
      const dateA = a.lastMessage.createdAt ? new Date(a.lastMessage.createdAt).getTime() : 0;
      const dateB = b.lastMessage.createdAt ? new Date(b.lastMessage.createdAt).getTime() : 0;
  
      return dateB - dateA;
    });
  };

  useEffect(() => {
    fetchConvsDetails();
  }, [conversationsIds]);

  const handleFriendClick = (chat: ChatPreview) => {
    setActiveChat(chat);
  };

  const handleBackToFriends = () => {
    setActiveChat(null);
    fetchConvsDetails();
  };

  return (
    <Box
      className={`w-full sm:flex sm:justify-center overflow-x-hidden ${
        isDarkMode ? "dark:bg-dark-main-bg" : "bg-main-bg"
      }`}
    >
      <Slide
        direction={activeChat ? "right" : "right"}
        in={!activeChat}
        mountOnEnter
        unmountOnExit
      >
        <Box className="w-full sm:flex sm:justify-center absolute sm:static">
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
