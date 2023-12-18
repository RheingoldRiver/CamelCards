/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#fbf8ef",
          100: "#f4ebd1",
          200: "#e9d69e",
          300: "#dfc074",
          400: "#d5a64a",
          500: "#cc8b34",
          600: "#b46c2b",
          700: "#965127",
          800: "#7b4125",
          900: "#653622",
          950: "#391c0f",
        },
      },
      gridTemplateAreas: {
        game: ["board bids", "actions bids", "prefs prefs"],
        hand: ["cards index", "bid bid"],
      },
      gridTemplateColumns: {
        game: "auto max-content auto",
      },
      gridTemplateRows: {
        game: "max-content max-content max-content max-content max-content max-content auto",
        game2xl: "max-content max-content max-content max-content max-content auto",
      },
      dropShadow: {
        smIcon: "0 0 1px rgba(214, 211, 209)",
        mdIcon: ["0 0 2px rgb(214, 211, 209)", "0 0 1px rgb(214, 211, 209)"],
        lgIcon: ["0 0 4px rgb(214, 211, 209)", "0 0 2px rgb(214, 211, 209)"],
      },
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
};
