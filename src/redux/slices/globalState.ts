import { createSlice } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  isActivationToastShown:false
};

export const globalStateSlice = createSlice({
  name: "globalState",
  initialState: initialState,
  reducers: {
    setActivationToastShown: (state, action) => {
      state.isActivationToastShown = action.payload;
    },
  },
});

export const { setActivationToastShown } = globalStateSlice.actions;

export default globalStateSlice.reducer;
