import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { serverReq } from "../../API/utils/axiosConfig";

const initialState: INotification[] = [];

// Define an async thunk to fetch notifications from the API
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    try{
      const response = await serverReq.get('/notifications');
      return response.data.notifications;
    }
    catch(err:any){
      console.log(err);
    }
  }
);

export const markAsRead = createAsyncThunk(
  'notifications/markNotificationsAsRead',
  async (notificationsIds:string[]) => {
    try{
      const response = await serverReq.post('/notifications/mark-as-read', {data: {ids: notificationsIds}});
      return response.data.ids;
    }
    catch(err:any){
      console.log(err);
    }
  }
);

// Create the notifications slice
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      return action.payload; // Replace the entire state with the fetched data
    });
    builder.addCase(markAsRead.fulfilled, (state, action) => {
      state.forEach((notif) => {
        notif.status = 'read';
      });
    });
  },
});


export default notificationsSlice.reducer;

export const selectNotifications = (state: RootState) => state.notifications;