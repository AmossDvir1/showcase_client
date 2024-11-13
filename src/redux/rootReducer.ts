import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import globalStateReducer from "./slices/globalState";
import notificationsReducer from "./slices/notifications";
import chatReducer from "./slices/chats";

const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
  chats: chatReducer,
  globalState: globalStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
