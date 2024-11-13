// chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  openChats: UserDetails[];
  minimizedChats: { [id: string]: boolean }; // Dictionary to track minimized state of each chat
}

const initialState: ChatState = {
  openChats: [],
  minimizedChats: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addOpenChat: (state, action: PayloadAction<UserDetails>) => {
      const isChatOpen = state.openChats.some(
        (chat) => chat.id === action.payload.id
      );
      if (!isChatOpen) {
        state.openChats.unshift(action.payload);
        // Initialize minimized state as false (expanded) for new chats:
        state.minimizedChats[action.payload.id] = false;
      }
    },
    removeOpenChat: (state, action: PayloadAction<string>) => {
      state.openChats = state.openChats.filter(
        (chat) => chat.id !== action.payload
      );
      // Remove the minimized state entry as well: 
      delete state.minimizedChats[action.payload];
    },
    toggleChatWindow: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      const isChatOpen = state.openChats.some((chat) => chat.id === chatId);

      if (isChatOpen) {
        // Toggle the minimized state for the chat
        state.minimizedChats[chatId] = !state.minimizedChats[chatId];
      } else {
        // If not open, add it in an expanded state
        const newChat = state.openChats?.find( openChat => openChat.id === chatId )
        if (newChat) state.openChats?.push(newChat);
        state.minimizedChats[chatId] = false;
      }
    },
  },
});

export const { addOpenChat, removeOpenChat, toggleChatWindow } =
  chatSlice.actions;
export default chatSlice.reducer;
