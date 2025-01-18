import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import globalStateReducer from "./slices/globalState";
import notificationsReducer from "./slices/notifications";
import chatReducer from "./slices/chats";
import themeReducer from "./slices/themeSlice";
import aiAssistantSlice from "./slices/aiAssistantSlice";


const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
  chats: chatReducer,
  globalState: globalStateReducer,
  theme: themeReducer,
  aiAssistant: aiAssistantSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
