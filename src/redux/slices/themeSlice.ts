import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  mode: 'light' | 'dark';
}

// Retrieve the initial theme from localStorage, fallback to 'light'
const getInitialTheme = (): 'light' | 'dark' => {
  return (localStorage.getItem("theme") as 'light' | 'dark') || 'light';
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload); // Save to localStorage
    },
  },
});

export const { setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;