import React, { useState } from "react";
import { Box, Slide } from "@mui/material";
import FriendsList from "./FriendsList";
import ChatPage from "./ChatPage";
import { useAppSelector } from "../../redux/hooks";
import useMediaQuery from "../../components/responsiveness/useMediaQuery";

const MobileMessenger: React.FC = () => {
  const [activeChat, setActiveChat] = useState<UserDetails | null>(null);
  const isMobile = useMediaQuery(600);
  const isDarkMode = useAppSelector((state) => state.theme.mode) === "dark";

  if (!isMobile) return <></>;

  const handleFriendClick = (friend: UserDetails) => {
    setActiveChat(friend);
  };

  const handleBackToFriends = () => {
    setActiveChat(null);
  };

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
          <FriendsList onFriendClick={handleFriendClick} />
        </Box>
      </Slide>
      <Slide className="" direction={"left"} in={!!activeChat} mountOnEnter unmountOnExit>
        <Box className="w-full">
          {activeChat && (
            <ChatPage
              friend={activeChat}
              onBackToFriends={handleBackToFriends}
            />
          )}
        </Box>
      </Slide>
    </Box>
  );
};

export default MobileMessenger;
