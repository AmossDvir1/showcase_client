import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUserData = createAsyncThunk("user/fetchUserData", async () => {
    try{
        
    }
    catch(err:any){

    }
});

const initialState: UserDetails = {
  usernme: "",
  firstName: "",
  lastName: "",
  id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
