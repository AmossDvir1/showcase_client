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
import { removeDuplicatesById } from "../utils/utils";
import { AUTHENTICATION_ERROR } from "../utils/constants";
import { useAuth } from "./AuthContext";
import { refreshToken } from "../controllers/auth/getValidRefereshToken";

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
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineFriends, setOnlineFriends] = useState<UserDetails[]>([]);
  const { isAuthenticated, isActivated, setAccessToken } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  // Function to establish socket connection with latest token
  const establishSocketConnection = useCallback(async () => {
    let token = JSON.parse(localStorage.getItem("auth") || "{}")?.accessToken;
    if (!isActivated) {
      token = await refreshToken();
      setAccessToken(token?.accessToken ?? null);
      if (!token) return;
    }

    if (isActivated && isAuthenticated) {
      const newSocket = io(process.env.REACT_APP_API_BASE_URL ?? "", {
        auth: { token },
        transports: ["websocket"],
      });

      newSocket.on("connectionConfirmed", () => {
        console.log("Socket connection confirmed");
      });

      newSocket.on("newNotification", (data) => {
        dispatch(addNotification(data));
      });

      newSocket.on("onlineFriends", (friends) => {
        setOnlineFriends(removeDuplicatesById(friends));
      });

      newSocket.on("friendOnline", (newFriend) => {
        const { friendOnline } = newFriend;
        setOnlineFriends((prev) =>
          removeDuplicatesById([...prev, friendOnline])
        );
      });

      newSocket.on("friendOffline", (newFriend) => {
        const { friendOffline } = newFriend;
        setOnlineFriends((prev) =>
          prev.filter((friend) => friend.id !== friendOffline.id)
        );
      });

      newSocket.on("connect_error", async (error) => {
        console.error("WebSocket connection error:", error);

        if (error.message === AUTHENTICATION_ERROR) {
          newSocket.disconnect();
        }
      });

      setSocket(newSocket);

      // Clean up socket connection when component unmounts or token changes
      return () => {
        newSocket.off();
        newSocket.disconnect();
        setSocket(null);
      };
    }
  }, [dispatch, isActivated]);

  // Effect to handle socket (re)connection on token change
  useEffect(() => {
    if (isAuthenticated) {
      const cleanUpConnection = establishSocketConnection();
    }
  }, [isAuthenticated, establishSocketConnection]);

  return (
    <WebSocketContext.Provider value={{ socket, onlineFriends }}>
      {children}
    </WebSocketContext.Provider>
  );
};
