/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  corePlugins: {
    preflight: false,
  },
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
        "main-bg": "#130F23",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  important: "#root",
};
