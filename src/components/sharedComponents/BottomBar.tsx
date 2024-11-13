import React from "react";
import { Box, Divider } from "@mui/material";
import ChatDrawer from "../chat/ChatDrawer";
import Chat from "../chat/Chat";
import { RootState } from "../../redux/rootReducer";
import { removeOpenChat } from "../../redux/slices/chats";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface BottomBarProps {}

const BottomBar: React.FC<BottomBarProps> = () => {
  const dispatch = useAppDispatch();
  const openChats: UserDetails[] = useAppSelector(
    (state: RootState) => state.chats.openChats
  );
  const minimizedChats = useAppSelector(
    (state: RootState) => state.chats.minimizedChats
  );

  const onCloseChat = (friendId: string) => {
    dispatch(removeOpenChat(friendId));
  };

  return (
    <Box className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-end p-2 gap-2 pointer-events-none">
      {openChats.slice(0, 3).map((chat: UserDetails) => (
        <div key={chat.id} className="mx-5 pointer-events-auto">
          <Chat friend={chat} closeChat={() => onCloseChat(chat.id)} />
        </div>
      ))}
      <Divider flexItem className="" orientation="vertical"></Divider>
      <div className="flex justify-center items-center md:w-64 xs:w-30 pointer-events-auto">
        <ChatDrawer />
      </div>
    </Box>
  );
};

export default BottomBar;
