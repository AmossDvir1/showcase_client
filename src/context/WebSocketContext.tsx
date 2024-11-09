// WebSocketContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { addNotification } from "../redux/slices/notifications";

// Define the context
interface WebSocketContextType {
  socket: Socket | null;
  onlineFriends: UserDetails[];
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  onlineFriends: [],
});

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineFriends, setOnlineFriends] = useState<UserDetails[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let auth = localStorage.getItem("auth") || "";
    if (auth && auth !== "") {
      setToken(JSON.parse(auth));
    }
  }, []);

  useEffect(() => {
    // Initialize the WebSocket connection
    if (token && token !== "") {
      const newSocket = io(process.env.REACT_APP_API_BASE_URL ?? "", {
        auth: { token: token["accessToken"] },
        transports: ["websocket"],
      });

      // Listen for confirmation that the connection was established
      newSocket.on("connectionConfirmed", (data) => {
        console.log(data.message);
      });

      newSocket.on("newNotification", (data) => {
        dispatch(addNotification(data));
      });

      // Receive initial list of online friends
      newSocket.on("onlineFriends", (friends) => {
        setOnlineFriends(friends);
      });

      // Handle friend coming online
      newSocket.on("friendOnline", (newFriend) => {
        const { friendOnline } = newFriend;
        console.log(
          friendOnline.firstName + " " + friendOnline.lastName + " is Online"
        );
        setOnlineFriends([...onlineFriends, friendOnline]);
      });

      // Handle friend going offline
      newSocket.on("friendOffline", (newFriend) => {
        const { friendOffline } = newFriend;
        console.log(
            friendOffline.firstName + " " + friendOffline.lastName + " is Offline"
        );
        setOnlineFriends(
          onlineFriends.filter((friend) => friend.id !== friendOffline.id)
        );
      });

      // Handle any connection errors
      newSocket.on("connect_error", (error) => {
        console.error("WebSocket connection error:", error);
      });

      // Set the socket in state
      setSocket(newSocket);

      // Clean up on unmount
      return () => {
        newSocket.close();
      };
    }
  }, [token]);

  return (
    <WebSocketContext.Provider value={{ socket, onlineFriends }}>
      {children}
    </WebSocketContext.Provider>
  );
};
