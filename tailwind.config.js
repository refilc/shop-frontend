/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({themes: {
    light: {
      colors: {
        primary: "#0072f5",
        secondary: "#0E275A",
        text: "#011234",
        textsec: "#0A1C4180",
        background: "#e3ebfb",
        textblue: "#243F76",
      }
    },
    dark: {
      colors: {
        primary: "#0072f5",
        secondary: "#0E275A",
        text: "#011234",
        textsec: "#0A1C4180",
        background: "#494d53",
        textblue: "#243F76",
      }
    },
  },},)],
}

