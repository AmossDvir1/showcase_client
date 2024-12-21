import React, { useCallback, useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import { useWebSocket } from "../../context/WebSocketContext";
import Loader from "../sharedComponents/Loader";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/rootReducer";
import BubbleMessage from "./BubbleMessage";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatInput from "./ChatInput";
import TypingBubble from "./TypingBubble";
import Typography from "../sharedComponents/Typography";

interface ChatBodyProps {
  friend: UserDetails;
  fullWidth?: boolean;
  fullHeight?: boolean;
}

const ChatBody: React.FC<ChatBodyProps> = ({ friend, fullWidth=false, fullHeight=false }) => {
  const friendName = `${friend.firstName} ${friend.lastName}`;
  const [inputString, setInputString] = useState("");
  const { socket } = useWebSocket();
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const userInfo = useAppSelector((state: RootState) => state.user.userInfo);
  const [chatLength, setChatLength] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [chatId, setChatId] = useState<string>("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isUserTyping, setIsUserTyping] = useState<boolean>(false);
  const [isFriendTyping, setIsFriendTyping] = useState<boolean>(false);

  const [loadingMoreMessages, setLoadingMoreMessages] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 20;

  const onTyping = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value); // Update the input value

    // If user starts typing, set isUserTyping to true
    if (!isUserTyping) {
      setIsUserTyping(true); // Set the state to indicate the user is typing
    }

    // Clear the previous timeout and set a new one to stop typing after 2 seconds
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      setIsUserTyping(false); // Reset typing state after inactivity
    }, 2000); // 2 seconds timeout

    setTypingTimeout(timeout); // Set the timeout reference
  };

  useEffect(() => {
    if (socket && isUserTyping !== null) {
      // Emit the typing event to the server with the current typing status
      socket.emit("typing", { friendId: friend.id, isTyping: isUserTyping });
    }
  }, [isUserTyping, socket, friend.id]);

  useEffect(() => {
    // Clear timeout on component unmount to avoid memory leaks
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  const setMessages = (messages: Message[]) => {
    const sortedMessages = messages.sort((msg1, msg2) =>
      msg1.createdAt < msg2.createdAt ? 1 : -1
    );
    return sortedMessages;
  };

  useEffect(() => {
    chatHistory.length === chatLength ? setLoadMore(false) : setLoadMore(true);
    setChatLength(chatHistory.length);
  }, [chatHistory]);

  // Initial fetch for the latest messages
  useEffect(() => {
    if (socket) {
      fetchMessages(); // Load the first 20 messages

      // Listen for new messages
      socket.on("newMessage", (data: { newMessage: Message }) => {
        if (
          data?.newMessage?.chatId === chatId ||
          data?.newMessage.senderId.id === friend.id ||
          data?.newMessage.senderId.id === userInfo?.id
        ) {
          setIsFriendTyping(false);
          setChatHistory((prev) => setMessages([...prev, data.newMessage]));
        }
      });

      socket.on("typing", (data: { friendId: string; isTyping: boolean }) => {
        // Check if the incoming friendId matches the friend's ID in the current chat
        if (data.friendId === friend.id) {
          setIsFriendTyping(data.isTyping);
        }
      });
    }

    return () => {
      socket?.off("newMessage");
      socket?.off("conversation");
      socket?.off("typing");
    };
  }, [socket, friend.id]);

  // useEffect(, [isFriendTyping]);

  // Function to fetch messages for pagination
  const fetchMessages = useCallback(async () => {
    if (loadingMoreMessages || !socket) return; // Prevent duplicate fetches
    setLoadingMoreMessages(true);
    socket.emit("getConversation", { friendId: friend.id, limit, skip });
    socket.once(
      "conversation",
      (data: { messages: Message[]; chatId: string }) => {
        setChatId(data?.chatId);
        setChatHistory((prev) => setMessages([...data?.messages, ...prev]));
        // Prepend new messages
        setSkip((prevSkip) => prevSkip + limit); // Increment skip count for next fetch
        setLoadingMoreMessages(false);
        setHasFetched(true);
      }
    );
  }, [friend.id, limit, loadingMoreMessages, skip, socket]);

  const onSendMessage = () => {
    if (socket && inputString.trim()) {
      socket.emit("sendMessage", { friendId: friend.id, content: inputString });
      setChatHistory((prev) => [
        {
          senderId: {
            id: userInfo?.id ?? "",
            username: userInfo?.username ?? "",
          },
          content: inputString,
          createdAt: moment(new Date()).toISOString(),
        },
        ...prev,
      ]);
      setInputString(""); // Clear the input after sending
    }
  };

  return (
    <Box className={`z-30 bg-paper-light dark:bg-dark-paper  rounded-lg shadow-md 
        
        
      h-full flex flex-col`}>
      {/* Chat Messages Area */}
      <Box
        id="scrollableDiv"
        className={`flex ${
          chatHistory?.length > 0 ? "flex-col-reverse" : "flex-col items-center justify-center"
        }  overflow-y-auto p-2 h-full`}
      >
        {chatHistory?.length > 0 ? (
          <InfiniteScroll
            endMessage={
              <>
                {hasFetched && (
                  <div className="mb-2">
                    <Typography className="text-xs text-gray-300 items-center justify-center flex">
                      End of Conversation
                    </Typography>
                  </div>
                )}
              </>
            }
            inverse={true}
            next={fetchMessages}
            hasMore={loadMore} // Prevent loading more if we're still fetching
            style={{
              display: "flex",
              overflow: "hidden",
              flexDirection: "column-reverse",
            }}
            loader={
              <div className="flex flex-row items-center justify-center">
                <Loader key={0} />
              </div>
            }
            scrollableTarget="scrollableDiv"
            dataLength={chatHistory.length}
          >
            {isFriendTyping && <TypingBubble></TypingBubble>}
            {chatHistory.map((message, index) => (
              <BubbleMessage
                key={index}
                message={message}
                friend={friend}
                isOwnMessage={message?.senderId?.id === userInfo?.id}
              ></BubbleMessage>
            ))}
          </InfiniteScroll>
        ) : (loadingMoreMessages ? <div className=""><Loader size="md" /></div>:
          <Typography variant="body2" color="textSecondary">
            Start your conversation with {friendName}...
          </Typography>
        )}
        {loadMore && <div className="py-3"></div>}
      </Box>
      <Divider />

      {/* Message Input */}
      <Box className="p-2 max-h-20">
        <ChatInput
          onSendMessage={onSendMessage}
          onTyping={onTyping}
          inputString={inputString}
        />
      </Box>
    </Box>
  );
};

export default ChatBody;
