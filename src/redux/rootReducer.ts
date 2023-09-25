import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import globalStateReducer from "./slices/globalState";
import notificationsReducer from "./slices/notifications";

const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
  globalState: globalStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
