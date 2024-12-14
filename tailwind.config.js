/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  corePlugins: {
    preflight: false,
  },
  darkMode: 'class', // Enables dark mode with the "dark" class
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "100px",
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ["pop"],
    },
    extend: {
      colors: {
        primary: "#7573C5",
        "primary-light": "#8A88D8",
        secondary: "#c4fcff",
        "main-bg": "#f2f4f7",
        // Dark mode colors
        dark: {
          primary: "#7573c5",
          secondary: "#121212",
          'paper-dark': "#0e1827",
          paper: "#1b2937",
          'paper-light': "#424e5b",
          "main-bg": "#040a17",
          text: "#E4E4E7",
          "text-light":"#d0d5db",
          "text-muted": "#A1A1AA",
          background: "#0D0D12",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  important: "#root", // Ensures styles override other libraries like Material-UI
};
