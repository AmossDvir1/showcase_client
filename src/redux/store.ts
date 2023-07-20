import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import globalStateReducer from "./slices/globalState";
export default configureStore({
  reducer: { user: userReducer, globalState:globalStateReducer },
});


