import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { serverReq } from "../../API/utils/axiosConfig";

// Define the initial state
const initialState: boolean = false;

// Async thunk to fetch the AI assistant status
export const fetchAiAssistantStatus = createAsyncThunk(
  "aiAssistant/fetchStatus",
  async () => {
    try {
      const response = await serverReq.get("/settings/ai");
      console.log(response)
      return response?.data?.usingAIAssistant;
    } catch (err: any) {
      console.error("Error fetching AI assistant status:", err);
      throw err;
    }
  }
);

// Async thunk to update the AI assistant status
export const updateAiAssistantStatus = createAsyncThunk(
  "aiAssistant/updateStatus",
  async (status: boolean) => {
    try {
      await serverReq.post("/settings/ai", {
        data: {usingAIAssistant: status},
      });
      return status; // Return the updated status
    } catch (err: any) {
      console.error("Error updating AI assistant status:", err);
      throw err;
    }
  }
);

// Create the AI assistant slice
const aiAssistantSlice = createSlice({
  name: "aiAssistant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAiAssistantStatus.fulfilled, (_, action) => {
      return action.payload; // Set the state to the fetched status
    });
    builder.addCase(updateAiAssistantStatus.fulfilled, (_, action) => {
      return action.payload; // Set the state to the updated status
    });
  },
});

export default aiAssistantSlice.reducer;

// Selector to get the AI assistant status from the store
export const aiAssistantStatus = (state: RootState) => state.aiAssistant;
