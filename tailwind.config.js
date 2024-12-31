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
        "main-bg": "#f4f6f8",
        'paper-light':'#fcfcfc',
        'hover':"#e9ecf2",
        paper: "#f2f6fa",
        'paper-dark': 'rgb(229 231 235)',
        // Dark mode colors
        dark: {
          primary: "#7573c5",
          secondary: "#121212",
          'paper-dark': "#0e1827",
          paper: "#1b2937",
          'paper-light': "#424e5b",
          "main-bg": "#040a17",
          text: "#d0d5db",
          "text-light":"#e1e4e8",
          "text-muted": "#A1A1AA",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  important: "#root", // Ensures styles override other libraries like Material-UI
};
