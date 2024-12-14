import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import chatsReducer from "./slices/chats"
import globalStateReducer from "./slices/globalState";
import notificationsReducer from "./slices/notifications";
import themeReducer from "./slices/themeSlice"; 

const store = configureStore({
  reducer: {
    user: userReducer,
    globalState: globalStateReducer,
    notifications: notificationsReducer,
    chats: chatsReducer,
    theme: themeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
