import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Divider,
  TextField,
  Popper,
  Collapse,
  InputAdornment,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "../responsiveness/useMediaQuery";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Button } from "../sharedComponents/Button";
import MiniProfilePicture from "../sharedComponents/profilePicture/MiniProfilePicture";
import { useWebSocket } from "../../context/WebSocketContext";
import Loader from "../sharedComponents/Loader";
import SendIcon from "@mui/icons-material/Send";
import { toggleChatWindow } from "../../redux/slices/chats";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/rootReducer";
import { useNavigate } from "react-router-dom";
import BubbleMessage from "../sharedComponents/BubbleMessage";
import moment from "moment";

interface ChatProps {
  friend: UserDetails;
  closeChat: () => void;
}

const Chat: React.FC<ChatProps> = ({ friend, closeChat }) => {
  const navigate = useNavigate();
  const friendName = `${friend.firstName} ${friend.lastName}`;
  const chatBottomRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isMobile = useMediaQuery(500);
  const { onlineFriends } = useWebSocket();
  const [inputString, setInputString] = useState("");
  const dispatch = useAppDispatch();
  const { socket } = useWebSocket();
  const open = Boolean(anchorEl);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const userInfo = useAppSelector((state: RootState) => state.user.userInfo);
  const lastMessageRef = useRef<null | HTMLDivElement>(null);

  const handleToggle = () => {
    if (!open) {
      setAnchorEl(chatBottomRef.current);
    } else {
      setAnchorEl(null);
    }
    dispatch(toggleChatWindow(friend.id));
  };

  useEffect(() => {
    if (lastMessageRef?.current?.scrollIntoView) {
      lastMessageRef.current.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  useEffect(() => {
    if (socket) {
      socket.emit("getConversation", {
        friendId: friend.id,
        limit: 20,
        skip: 0,
      });
    }
    // Listen to the response from the server with the messages
    socket?.on("conversation", (data: { messages: any[] }) => {
      setChatHistory(data.messages);
    });

    // Listen to the response from the server with the messages
    socket?.on("newMessage", (data: { newMessage: {} }) => {
      setChatHistory((prev) => [...prev, data.newMessage]);
    });
    return () => {
      socket?.off("conversation"); // Clean up listener on component unmount
      socket?.off("newMessage"); // Clean up listener on component unmount
    };
  }, [socket, friend.id]);

  const onSendMessage = () => {
    if (socket && inputString.trim()) {
      socket.emit("sendMessage", { friendId: friend.id, content: inputString });
      setChatHistory((prevMessages) => [
        ...prevMessages,
        {
          senderId: userInfo ?? {},
          content: inputString,
          createdAt: moment(new Date()).toISOString()
        },
      ]);
      setInputString(""); // Clear the input after sending
    }
  };

  const onChatNameClick = () => {
    navigate(`/profile/${friend.urlMapping}`);
  };

  return (
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
                <Box className="z-30 relative bg-white rounded-lg shadow-md w-72 h-96 flex flex-col">
                  {/* Chat Header */}
                  <Box className="flex items-center justify-between p-2 bg-indigo-100 rounded-t-lg">
                    <MiniProfilePicture
                      userDetails={friend}
                      active={onlineFriends.some(
                        (item) => item.id === friend.id
                      )}
                    ></MiniProfilePicture>

                    <Typography component={"span"}>
                      <Link
                        className="text-black font-normal"
                        underline="hover"
                        component="button"
                        onClick={onChatNameClick}
                      >
                        {friendName}
                      </Link>
                    </Typography>
                    <IconButton size="small" onClick={closeChat}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Divider />

                  {/* Chat Messages Area */}
                  <Box className="flex flex-col overflow-y-auto p-2 h-full">
                    {chatHistory?.length > 0 ? (
                      chatHistory.map((message, index) => (
                        <BubbleMessage
                          key={index}
                          message={message}
                          friend={friend}
                          isOwnMessage={message?.senderId?.id === userInfo?.id}
                        ></BubbleMessage>
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Start your conversation with {friendName}...
                      </Typography>
                    )}

                    <div ref={lastMessageRef}></div>
                  </Box>
                  <Divider />

                  {/* Message Input */}
                  <Box className="p-2">
                    <TextField
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          // handle sending message here
                          e.preventDefault();
                          onSendMessage();
                        }
                      }}
                      onChange={(e) => setInputString(e.target.value)}
                      value={inputString}
                      sx={{ borderRadius: "8px" }}
                      placeholder="Write a message..."
                      fullWidth
                      multiline
                      InputProps={{
                        sx: {
                          borderRadius: "8px",
                          cursor: "default",
                          padding: "10px",
                        },
                        inputProps: {
                          className: "input-no-ring lg:text-sm xs:text-xs",
                          style: {
                            borderTopLeftRadius: "8px",
                            borderBottomLeftRadius: "8px",
                          },
                        },
                        endAdornment: (
                          <InputAdornment
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            position="end"
                          >
                            <IconButton
                              disabled={!inputString}
                              className={`flex items-center p-0 px-1 justify-center ${
                                inputString
                                  ? "text-primary cursor-pointer"
                                  : "text-gray-300 cursor-default"
                              }`}
                              onClick={onSendMessage}
                              disableRipple
                            >
                              {false ? (
                                <Loader />
                              ) : (
                                <SendIcon
                                  className={`flex items-center justify-center w-[20px] ${
                                    inputString
                                      ? "cursor-pointer"
                                      : "cursor-default"
                                  }`}
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Box>
              </Collapse>
            </div>
          )}
        </Popper>
      }
    </div>
  );
};

export default Chat;
