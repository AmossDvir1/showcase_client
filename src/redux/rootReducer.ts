import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import globalStateReducer from './slices/globalState';

const rootReducer = combineReducers({
  user: userReducer,
  globalState: globalStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;