// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {RootState} from "../rootReducer";

// // Define a type for the user state
// interface UserState {
//   userDetails: UserDetails | null;
//   isLoading: boolean;
//   error: string | null;
// }

// // Define a type for the user details
// interface UserDetails {
//   // Define the structure of user details here
//   userId: string;
//   username: string;
//   // Add other properties as needed
// }

// // Define an initial state for the user slice
// const initialState: UserState = {
//   userDetails: null,
//   isLoading: false,
//   error: null,
// };

// // Define an async thunk to fetch user details from the API
// export const fetchUserDetails = createAsyncThunk<UserDetails, void>(
//   "user/fetchUserDetails",
//   async () => {
//     // Make your API call here and return the user details
//     const response = await fetch("/api/user-details"); // Replace with your API endpoint
//     const data = await response.json();
//     return data;
//   }
// );

// // Create a user slice
// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     // Add other synchronous actions here if needed
//   },
//   extraReducers: (builder) => {
//     // Handle the start of the API call
//     builder.addCase(fetchUserDetails.pending, (state) => {
//       state.isLoading = true;
//       state.error = null;
//     });

//     // Handle the successful completion of the API call
//     builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.userDetails = action.payload;
//       state.error = null;
//     });

//     // Handle errors during the API call
//     builder.addCase(fetchUserDetails.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.error.message ?? "Error fetching user details";
//     });
//   },
// });

// // Export actions if needed
// export const {} = userSlice.actions;

// // Export the reducer
// export default userSlice.reducer;

// // Export a selector to get user details from the state
// export const selectUserDetails = (state: RootState) => state.user.userDetails;





import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { serverReq } from '../../API/utils/axiosConfig';

interface UserState {
  userInfo: UserInfo | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  status: 'idle',
  error: null,
};

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async () => {
  try {
    // Perform the API call to fetch user info here
    const res = await serverReq('/user/me'); // Replace with your actual API endpoint
    return res?.data?.userData;
  } catch (error) {
    throw Error('Error fetching user info');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserInfo: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Error fetching user info';
      });
  },
});

export const { clearUserInfo } = userSlice.actions;
export default userSlice.reducer;