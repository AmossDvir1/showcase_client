import React, { useRef, useState } from "react";
import {
  Popper,
  Collapse,
  Box,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "../responsiveness/useMediaQuery";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Button } from "../sharedComponents/Button";
import { toggleChatWindow } from "../../redux/slices/chats";
import { useAppDispatch } from "../../redux/hooks";
import ChatBody from "./ChatBody";
import MiniProfilePicture from "../sharedComponents/profilePicture/MiniProfilePicture";
import Typography from "../sharedComponents/Typography";
import { useWebSocket } from "../../context/WebSocketContext";
import { useNavigate } from "react-router-dom";

interface ChatProps {
  friend: UserDetails;
  closeChat: () => void;
}

const Chat: React.FC<ChatProps> = ({ friend, closeChat }) => {
  const friendName = `${friend.firstName} ${friend.lastName}`;
  const chatBottomRef = useRef<null | HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery(500);
  const dispatch = useAppDispatch();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const { onlineFriends } = useWebSocket();

  const onChatNameClick = () => {
    navigate(`/profile/${friend.urlMapping}`);
  };

  const handleToggle = () => {
    if (!open && chatBottomRef?.current) {
      setAnchorEl(chatBottomRef.current);
    } else {
      setAnchorEl(null);
    }
    dispatch(toggleChatWindow(friend.id));
  };

  return ( isMobile ? <></>:
    <div className="relative flex z-30">
      <div ref={chatBottomRef} className="md:w-64 xs:w-30">
        <Button
          btnsize={isMobile ? "xs" : "sm"}
          round
          className="relative rounded-full bg-primary h-full w-full text-white px-4 py-2 hover:bg-primary-light focus:outline-none"
          onClick={handleToggle}
        >
          <div className="flex items-center">
            {friendName}
            <ExpandLessIcon
              className={isMobile ? "w-4" : "w-6"}
              style={{
                transition: "all 0.28s ease",
                transform: `rotate(${open ? "0.5turn" : 0})`,
              }}
            />
          </div>
        </Button>
      </div>
      {
        <Popper
          transition
          keepMounted
          open={open}
          anchorEl={anchorEl}
          placement="top"
          className="z-30"
        >
          {({ TransitionProps }) => (
            <div>
              <Collapse
                className="mb-4 rounded-lg"
                {...TransitionProps}
                timeout={350}
              >
                
                {/* Chat Header */}
                <Box className="flex items-center justify-between p-2 bg-indigo-100 dark:bg-dark-paper-light rounded-t-lg">
                  <MiniProfilePicture
                    userDetails={friend}
                    active={onlineFriends.some((item) => item.id === friend.id)}
                  ></MiniProfilePicture>

                  <Typography component={"span"}>
                    <Link
                      className="text-black dark:text-paper-light font-normal"
                      underline="hover"
                      component="button"
                      onClick={onChatNameClick}
                    >
                      {friendName}
                    </Link>
                  </Typography>
                  {closeChat && (
                    <IconButton size="small" onClick={closeChat}>
                      <CloseIcon />
                    </IconButton>
                  )}
                </Box>
                <Divider />
                <div className="w-72 h-96 flex flex-col">
                <ChatBody friend={friend}></ChatBody></div>
              </Collapse>
            </div>
          )}
        </Popper>
      }
    </div>
  );
};

export default Chat;
