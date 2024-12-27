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
import {
  removeDuplicatesById,
} from "../utils/utils";
import { AUTHENTICATION_ERROR } from "../utils/constants";
import { useAuth } from "./AuthContext";
import { refreshToken } from "../controllers/auth/getValidRefereshToken";
import {
  getLocalStorageAuth,
  saveToLocalStorage,
} from "../API/utils/localStorageUtils";
import { CustomSocket } from "../types/socket";

// Define the context
interface WebSocketContextType {
  socket: Socket | null;
  // onlineFriends: UserDetails[];
  conversationsIds: ConversationId[];
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  // onlineFriends: [],
  conversationsIds: [],
});

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [conversationsIds, setConversationsIds] = useState<ConversationId[]>([]);
  const { isAuthenticated, isActivated, setAccessToken } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  // Function to establish socket connection with latest token
  const establishSocketConnection = useCallback(async () => {
    const authData = getLocalStorageAuth();
    let token = authData?.accessToken;
    let sessionId = authData?.sessionId;
    if (!isActivated) {
      const newRefreshData = await refreshToken();
      if (
        !newRefreshData ||
        newRefreshData?.error ||
        !newRefreshData?.activated ||
        !newRefreshData?.accessToken ||
        !newRefreshData?.sessionId
      ) {
        return;
      }
      sessionId = newRefreshData?.sessionId;
      token = newRefreshData.accessToken;
      saveToLocalStorage("auth", {
        accessToken: token,
        sessionId,
      });
      setAccessToken(newRefreshData?.accessToken ?? null);
    }

    if (isActivated && isAuthenticated) {
      const newSocket = io(process.env.REACT_APP_API_BASE_URL ?? "", {
        auth: { token, sessionId },
        transports: ["websocket"],
      }) as CustomSocket;

      newSocket.on("connectionConfirmed", () => {
        console.log("Socket connection confirmed");
      });

      newSocket.on("newNotification", (data) => {
        dispatch(addNotification(data));
      });

      newSocket.on("conversations", (conversationsIds: ConversationId[]) => {
        setConversationsIds(removeDuplicatesById(conversationsIds));
      });

      newSocket.on("friendOnline", (newConv: ConversationId) => {
        setConversationsIds((prev) => removeDuplicatesById([...prev, newConv]));
      });

      newSocket.on("friendOffline", (offlineConv: ConversationId) => {
        setConversationsIds(
          (prev) => (removeDuplicatesById(prev.filter((conv) => conv.id !== offlineConv.id)))
        );
      });

      newSocket.on("authError", async (data) => {
        console.error(data.message);

        // Attempt to refresh the token via HTTP API
        const refreshTokenData = await refreshToken(); // Implement this based on your API
        const accessToken = refreshTokenData?.accessToken;
        const sessionId = refreshTokenData?.sessionId;
        if (accessToken && sessionId) {
          // Save the new token and reconnect
          saveToLocalStorage("auth", {
            accessToken,
            sessionId,
          });
          newSocket.auth.token = accessToken; // Update token in auth
          newSocket.auth.sessionId = sessionId; // Update token in auth
          newSocket.connect(); // Reconnect the WebSocket
        } else {
          console.error(
            "Failed to refresh token. User needs to re-authenticate."
          );
        }
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
    <WebSocketContext.Provider
      value={{ socket, /*onlineFriends*/ conversationsIds }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
